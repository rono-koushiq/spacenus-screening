'use client';
import Loading from '@/components/loading';
import useLocation from '@/hooks/useLocation';
import { LatLngExpression } from 'leaflet';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import MapCore to prevent leaflet map rendering during SSR
// and render only if conditions are fulfilled
const MapCore = dynamic(() => import('./map-core'), { ssr: false });

const DEFAULT_CENTER: LatLngExpression = [49.8626951, 8.622622];
const DEFAULT_ZOOM: number = 15;

export default function Map() {
  const [mapReady, setMapReady] = useState(false);
  const [center, setCenter] = useState<LatLngExpression>(DEFAULT_CENTER);
  const { userLocation, isResolved } = useLocation();

  useEffect(() => {
    setCenter(userLocation);
  }, [userLocation]);

  useEffect(() => {
    setMapReady(true);
  }, []);

  // Prevent rendering if the component is not fully loaded on
  // the client or if the user's location is not resolved
  if (!mapReady || !isResolved) return <Loading />;

  return <MapCore center={center} zoom={DEFAULT_ZOOM} />;
}
