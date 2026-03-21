const WeatherData = require('../models/WeatherData');

const OWM_BASE = 'https://api.openweathermap.org/data/2.5';
const OPEN_METEO_GEO = 'https://geocoding-api.open-meteo.com/v1/search';
const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1/forecast';

// Map OWM weather condition IDs to icon names used by the frontend
function owmConditionToIcon(weatherArr) {
  const id = weatherArr?.[0]?.id ?? 800;
  if (id >= 200 && id < 300) return 'CloudLightning';
  if (id >= 300 && id < 400) return 'CloudDrizzle';
  if (id >= 500 && id < 600) return 'CloudRain';
  if (id >= 600 && id < 700) return 'CloudSnow';
  if (id >= 700 && id < 800) return 'Wind';
  if (id === 800) return 'Sun';
  return 'Cloud';
}

function owmConditionLabel(weatherArr) {
  return weatherArr?.[0]?.main || 'Unknown';
}

function openMeteoCodeToIcon(code) {
  if ([95, 96, 99].includes(code)) return 'CloudLightning';
  if ([80, 81, 82, 51, 53, 55, 61, 63, 65].includes(code)) return 'CloudRain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'CloudSnow';
  if ([45, 48].includes(code)) return 'Wind';
  if (code === 0 || code === 1) return 'Sun';
  return 'Cloud';
}

function openMeteoCodeToLabel(code) {
  if ([95, 96, 99].includes(code)) return 'Thunderstorm';
  if ([80, 81, 82, 51, 53, 55, 61, 63, 65].includes(code)) return 'Rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
  if ([45, 48].includes(code)) return 'Fog';
  if (code === 0) return 'Clear';
  if ([1, 2, 3].includes(code)) return 'Cloudy';
  return 'Unknown';
}

// Days of week for weekly forecast labels
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function categorizeEvaporation(evapMmDay) {
  if (evapMmDay >= 6) return 'High';
  if (evapMmDay >= 4) return 'Moderate';
  return 'Low';
}

function categorizeDewPoint(dewPoint) {
  if (dewPoint >= 24) return 'Very humid';
  if (dewPoint >= 18) return 'Humid';
  if (dewPoint >= 10) return 'Comfortable';
  return 'Dry';
}

function categorizeSolarIndex(solarIndex) {
  if (solarIndex >= 9) return 'Very High';
  if (solarIndex >= 7) return 'High';
  if (solarIndex >= 5) return 'Moderate';
  return 'Low';
}

function buildLiveAlertsAndInsights({
  tempC,
  humidity,
  windKmh,
  condition,
  rainChance,
  dewPoint,
  evapMmDay,
  solarIndex,
  feelsLike,
  sourceName
}) {
  let alert = {
    type: 'advisory',
    title: 'Weather Advisory',
    description: 'Conditions are currently stable for routine field activities.',
    advisory: 'Proceed with normal irrigation and monitoring schedules.',
    severity: 'low'
  };

  if (/thunderstorm/i.test(condition) || rainChance >= 80) {
    alert = {
      type: 'storm',
      title: 'Thunderstorm Risk',
      description: `Storm activity likely with up to ${rainChance}% rain probability and gusty winds.`,
      advisory: 'Avoid spraying and postpone fertilizer application for 12-24 hours.',
      severity: 'high'
    };
  } else if (/rain/i.test(condition) || rainChance >= 60) {
    alert = {
      type: 'rain',
      title: 'Active Rain Warning',
      description: `Rain chance is ${rainChance}%. Soil saturation and runoff risk may increase.`,
      advisory: 'Delay urea and pesticide sprays until the next dry window.',
      severity: 'high'
    };
  } else if (tempC >= 38 || feelsLike >= 40) {
    alert = {
      type: 'heat',
      title: 'Heat Stress Alert',
      description: `High heat detected (air ${tempC}C, feels like ${Math.round(feelsLike)}C).`,
      advisory: 'Irrigate in early morning or late evening and avoid noon spraying.',
      severity: 'medium'
    };
  } else if (windKmh >= 30) {
    alert = {
      type: 'wind',
      title: 'Strong Wind Warning',
      description: `Wind speed is ${windKmh} km/h, which can reduce spray efficiency.`,
      advisory: 'Avoid foliar spray until wind drops below 20 km/h.',
      severity: 'medium'
    };
  } else if (humidity >= 88) {
    alert = {
      type: 'disease',
      title: 'Fungal Risk Advisory',
      description: `Humidity is ${humidity}%, increasing fungal disease probability.`,
      advisory: 'Increase field scouting frequency and keep leaf canopy aerated.',
      severity: 'medium'
    };
  }

  const evapLabel = categorizeEvaporation(evapMmDay);
  const dewLabel = categorizeDewPoint(dewPoint);
  const solarLabel = categorizeSolarIndex(Number(solarIndex));

  return {
    alerts: [alert],
    insights: {
      evaporationRate: `${evapMmDay}mm/day (${evapLabel})`,
      dewPoint: `${dewPoint}C (${dewLabel})`,
      solarIndex: `${solarIndex} (${solarLabel})`,
      solarNote: `Live data from ${sourceName}. Wind ${windKmh} km/h, feels like ${Math.round(feelsLike)}C, rain chance ${rainChance}%.`
    }
  };
}

async function fetchLiveWeather(location) {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    const geoRes = await fetch(`${OPEN_METEO_GEO}?name=${encodeURIComponent(location)}&count=1`);
    if (!geoRes.ok) return null;
    const geo = await geoRes.json();
    const place = geo.results?.[0];
    if (!place) return null;

    const forecastUrl = `${OPEN_METEO_BASE}?latitude=${place.latitude}&longitude=${place.longitude}`
      + '&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature'
      + '&hourly=temperature_2m,precipitation_probability,weather_code'
      + '&daily=temperature_2m_max,temperature_2m_min,weather_code'
      + '&timezone=auto&forecast_days=5';

    const wxRes = await fetch(forecastUrl);
    if (!wxRes.ok) return null;
    const wx = await wxRes.json();

    const currentCode = wx.current?.weather_code ?? 0;
    const hourlyTimes = wx.hourly?.time || [];
    const now = new Date();
    const nextIdx = hourlyTimes.findIndex(t => new Date(t) >= now);
    const start = nextIdx >= 0 ? nextIdx : 0;
    const end = Math.min(start + 8, hourlyTimes.length);

    const hourlyForecast = [];
    for (let i = start; i < end; i += 1) {
      const dt = new Date(hourlyTimes[i]);
      const hh = dt.getHours().toString().padStart(2, '0');
      const mm = dt.getMinutes().toString().padStart(2, '0');
      hourlyForecast.push({
        time: `${hh}:${mm}`,
        temperature: `${Math.round(wx.hourly.temperature_2m?.[i] ?? 0)}C`,
        icon: openMeteoCodeToIcon(wx.hourly.weather_code?.[i] ?? currentCode),
        rainChance: `${Math.round(wx.hourly.precipitation_probability?.[i] ?? 0)}%`
      });
    }

    const weeklyForecast = (wx.daily?.time || []).slice(0, 5).map((_, i) => {
      const dt = new Date(wx.daily.time[i]);
      return {
        day: DAYS[dt.getDay()],
        tempRange: `${Math.round(wx.daily.temperature_2m_max?.[i] ?? 0)}/${Math.round(wx.daily.temperature_2m_min?.[i] ?? 0)}C`,
        icon: openMeteoCodeToIcon(wx.daily.weather_code?.[i] ?? currentCode)
      };
    });

    const tempC = Math.round(wx.current?.temperature_2m ?? 0);
    const humidity = Math.round(wx.current?.relative_humidity_2m ?? 0);
    const windKmh = Math.round(wx.current?.wind_speed_10m ?? 0);
    const feelsLike = Math.round(wx.current?.apparent_temperature ?? tempC);
    const dewPoint = Math.round(tempC - ((100 - humidity) / 5));
    const evapMmDay = parseFloat(((0.0023 * (tempC + 17.8) * Math.sqrt(Math.max(0, tempC - dewPoint))) + 0.5).toFixed(1));
    const solarIndex = parseFloat((8 + (tempC - 20) * 0.05).toFixed(1)).toFixed(1);
    const rainChance = Math.max(...hourlyForecast.map((h) => Number(String(h.rainChance).replace('%', '')) || 0), 0);
    const condition = openMeteoCodeToLabel(currentCode);
    const liveMeta = buildLiveAlertsAndInsights({
      tempC,
      humidity,
      windKmh,
      condition,
      rainChance,
      dewPoint,
      evapMmDay,
      solarIndex,
      feelsLike,
      sourceName: 'Open-Meteo'
    });

    return {
      source: 'live-open-meteo',
      location: {
        city: place.name || location,
        state: place.admin1 || place.country || ''
      },
      current: {
        temperature: tempC,
        humidity,
        windSpeed: windKmh,
        condition
      },
      hourlyForecast,
      weeklyForecast,
      alerts: liveMeta.alerts,
      insights: liveMeta.insights,
      updatedAt: new Date()
    };
  }

  // Parallel fetch: current weather + 5-day / 3-hour forecast
  const [currentRes, forecastRes] = await Promise.all([
    fetch(`${OWM_BASE}/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`),
    fetch(`${OWM_BASE}/forecast?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric&cnt=40`)
  ]);

  if (!currentRes.ok) {
    const text = await currentRes.text();
    throw new Error(`Live weather API error: ${currentRes.status} ${text}`);
  }
  if (!forecastRes.ok) {
    const text = await forecastRes.text();
    throw new Error(`Live forecast API error: ${forecastRes.status} ${text}`);
  }

  const current = await currentRes.json();
  const forecast = await forecastRes.json();

  // Build hourly forecast: next 8 slots (~24 hours at 3hr intervals)
  const hourlyForecast = (forecast.list || []).slice(0, 8).map(slot => {
    const dt = new Date(slot.dt * 1000);
    const hours = dt.getHours().toString().padStart(2, '0');
    const minutes = dt.getMinutes().toString().padStart(2, '0');
    const rain = slot.pop !== undefined ? Math.round(slot.pop * 100) : 0;
    return {
      time: `${hours}:${minutes}`,
      temperature: `${Math.round(slot.main.temp)}C`,
      icon: owmConditionToIcon(slot.weather),
      rainChance: `${rain}%`
    };
  });

  // Build weekly forecast: group 3-hour slots by day, pick daily min/max
  const dayMap = {};
  for (const slot of (forecast.list || [])) {
    const dt = new Date(slot.dt * 1000);
    const dayKey = DAYS[dt.getDay()];
    if (!dayMap[dayKey]) {
      dayMap[dayKey] = { temps: [], icon: owmConditionToIcon(slot.weather) };
    }
    dayMap[dayKey].temps.push(slot.main.temp);
  }
  const weeklyForecast = Object.entries(dayMap).slice(0, 5).map(([day, data]) => ({
    day,
    tempRange: `${Math.round(Math.max(...data.temps))}/${Math.round(Math.min(...data.temps))}C`,
    icon: data.icon
  }));

  // Compute derived agronomy insights from live data
  const tempC = Math.round(current.main?.temp ?? 0);
  const humidity = current.main?.humidity ?? 0;
  const windKmh = Math.round((current.wind?.speed ?? 0) * 3.6);
  const dewPoint = Math.round(tempC - ((100 - humidity) / 5));
  const evapMmDay = parseFloat(((0.0023 * (tempC + 17.8) * Math.sqrt(Math.max(0, tempC - dewPoint))) + 0.5).toFixed(1));
  const solarIndex = parseFloat((8 + (tempC - 20) * 0.05).toFixed(1)).toFixed(1);
  const rainChance = Math.max(...hourlyForecast.map((h) => Number(String(h.rainChance).replace('%', '')) || 0), 0);
  const condition = owmConditionLabel(current.weather);
  const feelsLike = Math.round(current.main?.feels_like ?? tempC);
  const liveMeta = buildLiveAlertsAndInsights({
    tempC,
    humidity,
    windKmh,
    condition,
    rainChance,
    dewPoint,
    evapMmDay,
    solarIndex,
    feelsLike,
    sourceName: 'OpenWeatherMap'
  });

  return {
    source: 'live',
    location: {
      city: current.name || location,
      state: current.sys?.country || ''
    },
    current: {
      temperature: tempC,
      humidity,
      windSpeed: windKmh,
      condition
    },
    hourlyForecast,
    weeklyForecast,
    alerts: liveMeta.alerts,
    insights: liveMeta.insights,
    updatedAt: new Date()
  };
}

exports.getWeather = async (req, res) => {
  try {
    const location = req.query.location || 'Bargarh';

    // If an external weather API key is configured, prefer live weather.
    try {
      const liveWeather = await fetchLiveWeather(location);
      if (liveWeather) return res.json(liveWeather);
    } catch (liveErr) {
      console.warn(liveErr.message);
    }

    let weather = await WeatherData.findOne({ 'location.city': location });
    if (!weather) {
      weather = await WeatherData.findOne(); // fallback to any available
    }
    if (!weather) return res.status(404).json({ message: 'No weather data available. Seed weather data or configure WEATHER_API_KEY.' });
    res.json({ source: 'database', ...weather.toObject() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
