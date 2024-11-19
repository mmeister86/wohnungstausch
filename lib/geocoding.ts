// Add a delay to prevent rate limiting
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function geocodeAddress(address: string): Promise<[number, number] | null> {
  try {
    // Add a 1-second delay to prevent rate limiting
    await delay(1000);
    
    const response = await fetch(
      `/api/geocode?q=${encodeURIComponent(address)}`
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json()
    console.log('Geocoding response:', data)
    
    if (data && Array.isArray(data) && data.length > 0) {
      const { lat, lon } = data[0]
      if (lat && lon) {
        return [parseFloat(lat), parseFloat(lon)]
      }
    }

    return null
  } catch (error) {
    console.error('Detailed geocoding error:', error)
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      })
    }
    throw error
  }
}
