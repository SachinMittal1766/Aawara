import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  const p = new URL(req.url).searchParams;
  const lat = p.get('lat'); const lon = p.get('lon');
  if (!lat || !lon) return NextResponse.json({ error: 'Coordinates required' }, { status: 400 });
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`, { headers: { 'User-Agent': 'AawaraMVP/1.0' }, next: { revalidate: 3600 } });
    const data = await res.json(); const a = data.address || {};
    return NextResponse.json({ locality: a.city || a.town || a.village || a.suburb || 'Your location' });
  } catch { return NextResponse.json({ locality: 'Your location' }); }
}
