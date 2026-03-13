"use client";
import { useEffect, useRef } from "react";

interface Props {
  lat: number;
  lon: number;
  onChange: (lat: number, lon: number) => void;
}

export default function MapPicker({ lat, lon, onChange }: Props) {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mapRef.current) return;

    const L = require("leaflet");

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    const map = L.map(containerRef.current).setView([lat, lon], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap" }).addTo(map);

    const marker = L.marker([lat, lon], { draggable: true }).addTo(map);
    marker.on("dragend", () => { const pos = marker.getLatLng(); onChange(pos.lat, pos.lng); });
    map.on("click", (e: any) => { marker.setLatLng(e.latlng); onChange(e.latlng.lat, e.latlng.lng); });

    mapRef.current = map;
    markerRef.current = marker;
  }, []);

  return <div ref={containerRef} style={{ height: "400px", width: "100%", borderRadius: "16px", overflow: "hidden" }} />;
}