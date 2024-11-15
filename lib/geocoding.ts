interface GeocodingResult {
  lat: number;
  lon: number;
}

export async function geocodeAddress(strasse: string, hausnummer: string, plz: string, stadt: string): Promise<GeocodingResult | null> {
  try {
    const query = encodeURIComponent(`${strasse} ${hausnummer}, ${plz} ${stadt}, Germany`);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`,
      {
        headers: {
          'User-Agent': 'Wohnungstausch/1.0'
        }
      }
    );

    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      };
    }
    
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}
