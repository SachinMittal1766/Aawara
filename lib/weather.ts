import { WeatherPoint } from './types';
export async function getWeather(lat: number, lon: number, date?: string): Promise<{ current: WeatherPoint; hourly: WeatherPoint[]; timezone: string }> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,precipitation,wind_speed_10m,weather_code&current=temperature_2m,precipitation,wind_speed_10m,weather_code&timezone=auto&forecast_days=7`;
  const response = await fetch(url, { next: { revalidate: 900 } }); if (!response.ok) throw new Error('Weather service unavailable');
  const data = await response.json(); const hourly: WeatherPoint[] = data.hourly.time.map((time: string, i: number) => ({ time, temperature: data.hourly.temperature_2m[i], rainProbability: data.hourly.precipitation_probability[i] || 0, precipitation: data.hourly.precipitation[i] || 0, wind: data.hourly.wind_speed_10m[i] || 0, code: data.hourly.weather_code[i] }));
  const current = { time: data.current.time, temperature: data.current.temperature_2m, rainProbability: hourly.find(x => x.time === data.current.time)?.rainProbability || 0, precipitation: data.current.precipitation || 0, wind: data.current.wind_speed_10m || 0, code: data.current.weather_code };
  return { current, hourly: date ? hourly.filter(x => x.time.startsWith(date)) : hourly, timezone: data.timezone };
}
