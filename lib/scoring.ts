import { Place, Recommendation, WeatherPoint } from './types';
export function scorePlace(place: Place, weather: WeatherPoint, preference?: boolean): Recommendation {
  const rainPenalty = place.indoor ? weather.rainProbability * .08 : weather.rainProbability * .45;
  const tempPenalty = place.indoor ? 0 : Math.max(0, Math.abs(weather.temperature - 27) - 5) * 2;
  const openBonus = place.openNow === true ? 25 : place.openNow === false ? -30 : 0;
  const preferenceBonus = preference === undefined ? 0 : preference === place.indoor ? 16 : -12;
  const score = Math.max(0, Math.round(60 + openBonus + preferenceBonus - rainPenalty - tempPenalty));
  const confidence = place.openNow === undefined ? 'low' : weather.rainProbability > 70 ? 'medium' : 'high';
  const window = weather.rainProbability < 25 ? '10:00–12:00' : weather.rainProbability < 55 ? '16:00–18:00' : '11:00–13:00';
  const weatherNote = weather.rainProbability < 25 ? `low rain chance (${weather.rainProbability}%)` : `rain is possible (${weather.rainProbability}%)`;
  const reason = place.openNow === true ? `${window} looks suitable: ${weatherNote}, with ${Math.round(weather.temperature)}°C. Listed hours cover this period.` : `The forecast has ${weatherNote}; verify venue hours before leaving.`;
  return { ...place, score, window, weather, reason, confidence };
}
