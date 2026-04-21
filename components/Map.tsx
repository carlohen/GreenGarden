"use client";

import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapMarker {
  lat: number;
  lng: number;
  label?: string;
  href?: string;
}

interface MapProps {
  lat: number;
  lng: number;
  zoom?: number;
  markers?: MapMarker[];
}

// Function to update map view when props change
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

// Custom pulsing marker icon for the primary location
const primaryIcon = L.divIcon({
  className: "custom-marker-primary",
  html: `
    <div class="relative">
      <div class="absolute inset-0 bg-brand rounded-full animate-ping opacity-40 scale-150"></div>
      <div class="relative bg-brand p-3 rounded-full shadow-[0_0_20px_rgba(45,90,39,0.5)] border-2 border-white">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// Subtle icon for secondary markers (other plants)
const secondaryIcon = L.divIcon({
  className: "custom-marker-secondary",
  html: `
    <div class="relative group">
      <div class="bg-brand-light p-2 rounded-full shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
        <svg viewBox="0 0 24 24" width="12" height="12" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L12 22M2 12L22 12"></path>
        </svg>
      </div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export default function Map({ lat, lng, zoom = 17, markers = [] }: MapProps) {
  const position: [number, number] = [lat, lng];

  return (
    <div className="w-full h-full relative z-10">
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <ChangeView center={position} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Primary Marker */}
        <Marker position={position} icon={primaryIcon} />

        {/* Secondary Markers */}
        {markers.map((marker, idx) => (
          <Marker 
            key={`${marker.lat}-${marker.lng}-${idx}`}
            position={[marker.lat, marker.lng]}
            icon={secondaryIcon}
          >
            {marker.label && (
              <Popup>
                <div className="p-1">
                  <p className="font-heading text-brand text-sm mb-1">{marker.label}</p>
                  {marker.href && (
                    <a href={marker.href} className="text-[10px] text-brand-light font-black uppercase tracking-widest hover:underline">
                      Ver detalhes →
                    </a>
                  )}
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
      
      <div className="absolute inset-0 pointer-events-none z-[1000] dark:bg-black/10 transition-colors" />
    </div>
  );
}
