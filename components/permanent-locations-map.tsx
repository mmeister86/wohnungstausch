'use client'

import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import 'leaflet-routing-machine'
import { useEffect } from 'react'

// Fix for default marker icons in Leaflet with Next.js
const apartmentIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const permanentIcon = L.icon({
  iconUrl: '/marker-icon-red.png',
  iconRetinaUrl: '/marker-icon-red-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Add global CSS to hide routing markers
if (typeof window !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    .leaflet-routing-container { display: none !important; }
    .leaflet-marker-icon.leaflet-marker-draggable { display: none !important; }
    .leaflet-marker-icon.leaflet-routing-icon { display: none !important; }
    .leaflet-marker-shadow { display: none !important; }
    .leaflet-div-icon { background: none !important; border: none !important; }
    .hidden-marker { display: none !important; }
  `
  document.head.appendChild(style)
}

const PERMANENT_LOCATIONS = [
  {
    name: "Julius Leber Kaserne",
    address: "Kurt-Schumacher-Damm 41",
    plz: "13407",
    stadt: "Berlin",
    coordinates: [52.560207, 13.325043] as [number, number]
  },
  {
    name: "Henning-von-Tresckow-Kaserne",
    address: "Werderscher Damm 21-29",
    plz: "14548",
    stadt: "Schwielowsee",
    coordinates: [52.386382, 12.971501] as [number, number]
  }
]

function RoutingControl({ currentApartmentCoordinates, permanentLocations }: {
  currentApartmentCoordinates: LatLngExpression,
  permanentLocations: typeof PERMANENT_LOCATIONS
}) {
  const map = useMap()

  useEffect(() => {
    if (!map || !currentApartmentCoordinates || !permanentLocations.every(loc => loc.coordinates)) return

    // Find nearest permanent location
    const currentLatLng = L.latLng(currentApartmentCoordinates as [number, number])
    let nearestLocation = permanentLocations[0]
    let shortestDistance = currentLatLng.distanceTo(L.latLng(nearestLocation.coordinates!))

    permanentLocations.forEach(location => {
      if (!location.coordinates) return
      const distance = currentLatLng.distanceTo(L.latLng(location.coordinates))
      if (distance < shortestDistance) {
        shortestDistance = distance
        nearestLocation = location
      }
    })

    // Create routing control with a small delay
    const timeoutId = setTimeout(() => {
      try {
        const control = new L.Routing.Control({
          waypoints: [
            L.latLng(currentApartmentCoordinates as [number, number]),
            L.latLng(nearestLocation.coordinates!)
          ],
          plan: new L.Routing.Plan(
            [
              L.latLng(currentApartmentCoordinates as [number, number]),
              L.latLng(nearestLocation.coordinates!)
            ],
            {
              createMarker: () => false,
              routeWhileDragging: false,
              draggableWaypoints: false,
              addWaypoints: false
            }
          ),
          routeWhileDragging: false,
          showAlternatives: false,
          fitSelectedRoutes: true,
          lineOptions: {
            styles: [{ color: '#6366f1', weight: 4 }],
            extendToWaypoints: false,
            missingRouteTolerance: 0
          },
          show: false,
          addWaypoints: false
        })

        map.whenReady(() => {
          control.addTo(map)

          // Create a bounds object that includes both points
          const bounds = L.latLngBounds([
            L.latLng(currentApartmentCoordinates as [number, number]),
            L.latLng(nearestLocation.coordinates!)
          ])

          // Fit the map to show the entire route with some padding
          map.fitBounds(bounds, {
            padding: [50, 50],
            maxZoom: 15
          })
        })

        return () => {
          control.remove()
        }
      } catch (error) {
        console.error('Error creating routing control:', error)
      }
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [map, currentApartmentCoordinates, permanentLocations])

  return null
}

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
      {/* Permanent Location Markers */}
      {PERMANENT_LOCATIONS.map((location, index) => (
        <Marker
          key={`permanent-${index}`}
          position={location.coordinates!}
          icon={permanentIcon}
        >
          <Tooltip permanent>
            {location.name}
          </Tooltip>
        </Marker>
      ))}
      {/* Current Apartment Marker */}
      <Marker
        position={currentApartmentCoordinates}
        icon={apartmentIcon}
      />
      {/* Routing Control */}
      <RoutingControl
        currentApartmentCoordinates={currentApartmentCoordinates}
        permanentLocations={PERMANENT_LOCATIONS}
      />
    </MapContainer>
  )
}

export default PermanentLocationsMap
