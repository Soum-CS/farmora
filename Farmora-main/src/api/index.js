// src/api/index.js
// Centralized API utility for Farmora frontend

const API_URL = import.meta.env.VITE_API_URL || '/api';

export function getApiBaseUrl() {
  return API_URL;
}

async function parseResponse(res, fallbackMessage) {
  if (res.ok) return res.json();
  let message = fallbackMessage;
  try {
    const err = await res.json();
    if (err?.message) message = err.message;
  } catch (_) {
    // Ignore parse errors and use fallback message.
  }
  throw new Error(message);
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return parseResponse(res, 'Login failed');
}

export async function register(name, email, password, role) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role })
  });
  return parseResponse(res, 'Registration failed');
}

export async function getCrops(token) {
  const res = await fetch(`${API_URL}/crops`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return parseResponse(res, 'Failed to fetch crops');
}

export async function createCrop(token, crop) {
  const res = await fetch(`${API_URL}/crops`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(crop)
  });
  return parseResponse(res, 'Failed to create crop');
}

// Add more API functions as needed (marketplace, analysis, etc.)

export async function getFarmerDashboard(token) {
  const res = await fetch(`${API_URL}/farmer/dashboard`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return parseResponse(res, 'Failed to fetch farmer dashboard');
}

export async function getFarmerProfile(token) {
  const res = await fetch(`${API_URL}/farmer/profile`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return parseResponse(res, 'Failed to fetch farmer profile');
}

export async function updateFarmerProfile(token, data) {
  const res = await fetch(`${API_URL}/farmer/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  return parseResponse(res, 'Failed to update farmer profile');
}

export async function getWeather(location = 'Bargarh') {
  const res = await fetch(`${API_URL}/weather?location=${encodeURIComponent(location)}`);
  return parseResponse(res, 'Failed to fetch weather data');
}

export async function getDiseaseAlerts(region = 'Bargarh') {
  const res = await fetch(`${API_URL}/disease-alerts?region=${encodeURIComponent(region)}`);
  return parseResponse(res, 'Failed to fetch disease alerts');
}

