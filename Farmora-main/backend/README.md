# Farmora Backend

This is the backend API for the Farmora platform, built with Node.js, Express, and MongoDB.

## Features
- User authentication (register, login, roles)
- Crop management
- Marketplace listings
- Weather data
- Analytics
- Officer tools
- Community features

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up your `.env` file (see `.env` for example values).
3. Start the server:
   ```bash
   npm run dev
   ```

## Environment Variables

- Required:
   - `PORT` (default `5000`)
   - `MONGO_URI`
   - `JWT_SECRET`
- Optional:
   - `WEATHER_API_KEY` for OpenWeatherMap live weather API
   - `WEATHER_API_BASE_URL` if using a non-default OpenWeatherMap endpoint

If `WEATHER_API_KEY` is not set, the weather endpoint uses Open-Meteo live weather (no key).
If external providers fail, it falls back to MongoDB weather records.

## Realtime Disease Alerts

- Snapshot: `GET /api/disease-alerts`
- Live stream (SSE): `GET /api/disease-alerts/stream`
- Create alert (JWT required): `POST /api/disease-alerts`

The API will run on `http://localhost:5000` by default.

## Project Structure
- `models/` - Mongoose models
- `controllers/` - Route logic
- `routes/` - Express route definitions
- `server.js` - App entry point

## API Endpoints
(Endpoints for all features will be documented as implemented.)
