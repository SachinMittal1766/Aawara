import { Intent } from './types';

export function buildPlacesRequest(intent: Intent, coords: { lat: number; lon: number }) {
  if (intent.destination) return `/api/places?destination=${encodeURIComponent(intent.destination)}&category=${encodeURIComponent(intent.category)}`;
  return `/api/places?lat=${coords.lat}&lon=${coords.lon}`;
}
export function buildWeatherRequest(intent: Intent, target: { lat: number; lon: number }) { return `/api/weather?lat=${target.lat}&lon=${target.lon}&date=${intent.date}`; }
export function isCurrentSearch(requestVersion: number, latestVersion: number) { return requestVersion === latestVersion; }
