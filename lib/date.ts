export function nextSunday(now = new Date(), timeZone = 'Asia/Kolkata') {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'short' }).format(now);
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const current = days.indexOf(parts); const add = current === 0 ? 7 : 7 - current;
  const result = new Date(now); result.setDate(result.getDate() + add); return result.toISOString().slice(0, 10);
}
export function resolveDate(text: string, now = new Date(), timeZone = 'Asia/Kolkata'): string {
  const value = text.toLowerCase();
  if (value.includes('sunday')) return nextSunday(now, timeZone);
  if (value.includes('this weekend') || value.includes('next weekend')) { const d = new Date(now); const day = d.getDay(); d.setDate(d.getDate() + (day === 0 ? 6 : 6 - day)); return d.toISOString().slice(0, 10); }
  if (value.includes('tomorrow')) { const d = new Date(now); d.setDate(d.getDate() + 1); return d.toISOString().slice(0,10); }
  if (value.includes('today') || value.includes('this evening') || value.includes('tonight')) return now.toISOString().slice(0,10);
  return now.toISOString().slice(0,10);
}
