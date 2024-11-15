'use client'

import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import type { Icon } from 'leaflet'

interface MapProps {
  center: [number, number]
  markerIcon: Icon
}

export default function Map({ center, markerIcon }: MapProps) {
  const mapRef = useRef(null)

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        // @ts-ignore
        mapRef.current.remove()
      }
    }
  }, [])

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="h-full w-full"
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center} icon={markerIcon} />
    </MapContainer>
  )
}
