'use client';
import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';

export default function useLocation() {
  const [userLocation, setUserLocation] = useState<LatLngExpression>([
    49.8626951, 8.622622,
  ]);
  const [isResolved, setIsResolved] = useState<boolean>(false);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setUserLocation([coords.latitude, coords.longitude]);
          setIsResolved(true);
        },
        () => {
          setIsResolved(true);
        },
      );
    } else {
      console.warn('Geolocation not supported by this browser');
      setIsResolved(true);
    }
  }, []);

  return {
    userLocation,
    isResolved,
  };
}
