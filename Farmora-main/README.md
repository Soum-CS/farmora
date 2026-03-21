# Farmora

AI-powered farming decision platform helping farmers predict crop yield, profit, and risks using data.

## Tech Stack
- React
- Vite
- Tailwind CSS

## Goal
Farmora helps farmers make data-driven decisions before planting by analyzing soil, weather, water availability, and market demand.

## Local Setup

1. Install frontend dependencies:
	```bash
	npm install
	```
2. Install backend dependencies:
	```bash
	cd backend
	npm install
	cd ..
	```
3. Create environment files:
	- Copy `.env.example` to `.env`
	- Copy `backend/.env.example` to `backend/.env`
4. Start MongoDB locally.
5. Seed backend data:
	```bash
	cd backend
	npm run dev
	```
	Open a second terminal and run:
	```bash
	cd backend
	node seed.js
	```
6. Start frontend:
	```bash
	npm run dev
	```

## API Keys

- Required keys:
  - `JWT_SECRET` in `backend/.env`
- Optional keys:
	- `WEATHER_API_KEY` in `backend/.env` for OpenWeatherMap live weather (higher detail)

If `WEATHER_API_KEY` is not provided, Farmora now fetches live weather from Open-Meteo (no key required).
If Open-Meteo is unavailable, Farmora falls back to MongoDB weather data (seeded via `backend/seed.js`).

## Realtime Disease Map

- Data endpoint: `GET /api/disease-alerts?region=Bargarh`
- Stream endpoint (SSE): `GET /api/disease-alerts/stream?region=Bargarh`
- Create alert (auth required): `POST /api/disease-alerts`

The map listens to SSE and updates instantly whenever a new disease alert is posted.