'use client';
import { cn } from '@/lib/utilities';
import { RootState } from '@/store';
import { createArea, deleteArea, updateArea } from '@/store/slices/area-slice';
import L, { LatLngExpression } from 'leaflet';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import {
  AttributionControl,
  FeatureGroup,
  MapContainer,
  TileLayer,
} from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import classes from './index.module.scss';

const EditControl = dynamic(
  () => import('react-leaflet-draw').then((mod) => mod.EditControl),
  { ssr: false },
);

type Props = {
  center: LatLngExpression;
  zoom: number;
};

export default function MapCore({ center, zoom }: Props) {
  const dispatch = useDispatch();
  const { areas } = useSelector((state: RootState) => state.area);
  const featureGroupRef = useRef<L.FeatureGroup | null>(null);

  const _onCreated = (event: L.DrawEvents.Created) => {
    const layer = event.layer.toGeoJSON() as GeoJSON.Feature;
    const leafletId = (event.layer as any)._leaflet_id as number;

    const invertedCoordinates = (
      layer.geometry as GeoJSON.Polygon
    ).coordinates[0].map((corner) => [corner[1], corner[0]]) as [
      number,
      number,
    ][];

    dispatch(
      createArea({
        id: leafletId,
        corners: invertedCoordinates,
      }),
    );
  };

  const _onEdited = (event: L.DrawEvents.Edited) => {
    const layers = event.layers;

    layers.eachLayer((layer: any) => {
      const leafletLayer = layer.toGeoJSON() as GeoJSON.Feature;
      const leafletId = (layer as any)._leaflet_id as number;
      const leafletCoordinates = (leafletLayer.geometry as GeoJSON.Polygon)
        .coordinates[0];

      dispatch(
        updateArea({
          id: leafletId,
          corners: leafletCoordinates.map((corner) => [
            corner[1],
            corner[0],
          ]) as [number, number][],
        }),
      );
    });
  };

  const _onDeleted = (event: L.DrawEvents.Deleted) => {
    const layers = event.layers;

    layers.eachLayer((layer: any) => {
      dispatch(
        deleteArea({
          id: layer._leaflet_id,
        }),
      );
    });
  };

  useEffect(() => {
    console.log({ areas });
    if (!featureGroupRef || !featureGroupRef.current) return;

    featureGroupRef.current.eachLayer((layer: any) => {
      const leafletLayer = layer.toGeoJSON() as GeoJSON.Feature;
      const leafletId = (layer as any)._leaflet_id as number;

      const area = areas.find((a) => a.id === leafletId);
      if (!area) {
        featureGroupRef.current?.removeLayer(layer);
        return;
      }

      const leafletCoordinates = (leafletLayer.geometry as GeoJSON.Polygon)
        .coordinates[0];

      if (
        JSON.stringify(
          leafletCoordinates.map((coordinate) => [
            coordinate[1],
            coordinate[0],
          ]),
        ) !== JSON.stringify(area.corners)
      ) {
        const newLatLngs = area.corners.map(
          ([lat, lng]) => new L.LatLng(lat, lng),
        );
        layer.setLatLngs(newLatLngs);
        layer.redraw();
      }
    });
  }, [areas]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={cn(classes['leaflet-container'])}
      attributionControl={false}
    >
      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topleft"
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
          }}
          onCreated={_onCreated}
          onEdited={_onEdited}
          onDeleted={_onDeleted}
        />
      </FeatureGroup>

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AttributionControl position="topright" />
    </MapContainer>
  );
}
