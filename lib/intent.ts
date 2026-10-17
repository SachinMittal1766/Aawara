import { Intent } from './types';
import { resolveDate } from './date';

const stopWords = /^(?:the|a|an|some|good|best|top|popular|nice)\s+/i;
function cleanDestination(value: string) { return value.replace(/[?.!,]+$/g, '').replace(stopWords, '').replace(/\s+(?:this|next|coming|tomorrow|today|tonight|on|under|within|for|if|when|with)\b.*$/i, '').trim(); }
export function extractDestination(query: string): string | undefined {
  const normalized = query.trim().replace(/\s+/g, ' ');
  const patterns = [
    /\b(?:in|around|near|at)\s+([A-Z][\w.' -]*(?:,\s*[A-Z][\w.' -]*)?)(?=\s+(?:this|next|coming|tomorrow|today|tonight|on|under|within|for|if|when|with)\b|[?.!,]|$)/i,
  ];
  for (const pattern of patterns) {
    const match = normalized.match(pattern);
    if (match?.[1]) {
      const destination = cleanDestination(match[1]);
      if (destination && !/^me$/i.test(destination)) return destination;
    }
  }
  return undefined;
}
export function parseIntent(query: string, now = new Date(), timeZone = 'Asia/Kolkata'): Intent {
  const q = query.toLowerCase();
  const intent = q.includes('best time') || q.includes('when should') ? 'best-time' : q.includes('near me') || q.includes('nearby') ? 'nearby' : q.includes('plan') || q.includes('half-day') ? 'plan' : 'discover';
  const indoor = q.includes('indoor') || q.includes('museum') || q.includes('gallery') ? true : q.includes('outdoor') || q.includes('park') || q.includes('fort') || q.includes('trek') ? false : undefined;
  const budgetMatch = q.match(/[₹r]\s?([\d,]+)/i); const radiusMatch = q.match(/(\d+)\s*(?:km|minutes?)/i); const destination = extractDestination(query);
  const category = q.includes('museum') || q.includes('gallery') ? 'museums and galleries' : q.includes('outdoor') || q.includes('trek') ? 'outdoor activities and tourist attractions' : 'tourist attractions';
  const cleanedBestTime = query.replace(/what('?s| is) the best (day and )?time to visit/i, '').replace(/\?/g, '').trim();
  return { intent, query, date: resolveDate(query, now, timeZone), country: 'India', category, destination: intent === 'best-time' ? destination || cleanedBestTime : destination, area: destination && intent !== 'best-time' ? destination : undefined, indoor, budget: budgetMatch ? Number(budgetMatch[1].replace(/,/g,'')) : undefined, radiusKm: radiusMatch ? (q.includes('minute') ? undefined : Number(radiusMatch[1])) : undefined, durationHours: q.includes('half-day') ? 4 : undefined, preferences: [indoor === true ? 'indoor' : indoor === false ? 'outdoor' : 'weather-friendly'] };
}
