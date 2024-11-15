'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

interface PermanentLocationsMapProps {
  currentApartmentCoordinates?: LatLngExpression
  zoom?: number
}

const PermanentLocationsMap = ({
  currentApartmentCoordinates,
  zoom = 15
}: PermanentLocationsMapProps) => {
  if (!currentApartmentCoordinates) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg">
        <p className="text-gray-500">Keine Koordinaten verfügbar</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={currentApartmentCoordinates}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker 
        position={currentApartmentCoordinates}
        icon={icon}
      />
    </MapContainer>
  )
}

export default PermanentLocationsMap
