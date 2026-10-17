import { describe, expect, it } from 'vitest';
import { extractDestination, parseIntent } from '../lib/intent';
import { buildPlacesRequest, buildWeatherRequest, isCurrentSearch } from '../lib/search';

describe('search request contract', () => {
  it('extracts a destination after a relative date phrase', () => { expect(extractDestination('Suggest places I can visit this Sunday in Rishikesh')).toBe('Rishikesh'); });
  it('extracts a destination from a simple city query', () => { expect(extractDestination('Where can I go this Sunday in Delhi?')).toBe('Delhi'); });
  it('sends Rishikesh instead of browser Delhi coordinates', () => { const intent = parseIntent('Suggest places I can visit this Sunday in Rishikesh'); expect(buildPlacesRequest(intent, { lat: 28.6139, lon: 77.209 })).toContain('destination=Rishikesh'); expect(buildPlacesRequest(intent, { lat: 28.6139, lon: 77.209 })).not.toContain('lat=28.6139'); });
  it('sends Jaipur for a Jaipur query', () => expect(buildPlacesRequest(parseIntent('Places to visit in Jaipur tomorrow'), { lat: 28.6139, lon: 77.209 })).toContain('destination=Jaipur'));
  it('sends Puri and Haridwar as distinct destination requests', () => { const browserDelhi = { lat: 28.6139, lon: 77.209 }; expect(buildPlacesRequest(parseIntent('Places to visit in Puri'), browserDelhi)).toContain('destination=Puri'); expect(buildPlacesRequest(parseIntent('Places to visit in Haridwar'), browserDelhi)).toContain('destination=Haridwar'); });
  it('uses the resolved destination coordinates for weather', () => { const intent = parseIntent('Places to visit in Rishikesh tomorrow'); expect(buildWeatherRequest(intent, { lat: 30.0869, lon: 78.2676 })).toContain('lat=30.0869'); });
  it('rejects stale responses', () => { expect(isCurrentSearch(1, 2)).toBe(false); expect(isCurrentSearch(2, 2)).toBe(true); });
});
