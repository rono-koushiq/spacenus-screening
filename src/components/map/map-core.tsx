'use client';
import { cn } from '@/lib/utilities';
import { RootState } from '@/store';
import { createArea } from '@/store/slices/area-slice';
import L, { LatLngExpression } from 'leaflet';
import dynamic from 'next/dynamic';
import {
  AttributionControl,
  FeatureGroup,
  MapContainer,
  Polygon,
  TileLayer,
} from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import classes from './index.module.scss';

const EditControl = dynamic(
  () => import('react-leaflet-draw').then((mod) => mod.EditControl),
  { ssr: false },
);

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

type Props = {
  center: LatLngExpression;
  zoom: number;
};

export default function MapCore({ center, zoom }: Props) {
  const dispatch = useDispatch();
  const { areas } = useSelector((state: RootState) => state.area);

  const handleCreate = (event: L.DrawEvents.Created) => {
    const layer = event.layer.toGeoJSON() as GeoJSON.Feature;

    const {
      coordinates: [corners],
    } = layer.geometry as GeoJSON.Polygon;

    dispatch(
      createArea({
        corners: corners.map((corner) => [corner[1], corner[0]]) as [
          number,
          number,
        ][],
      }),
    );

    event.layer.remove();
  };

  const handleEdit = (event: L.DrawEvents.Edited) => {
    const layers = event.layers;
    layers.eachLayer((layer: any) => {
      console.log({ layer });
      const editedLayer = layer.toGeoJSON() as GeoJSON.Feature;

      const {
        coordinates: [corners],
      } = editedLayer.geometry as GeoJSON.Polygon;

      const areaId = (layer as any).id;
      console.log({ areaId });
    });
  };

  const handleDelete = (event: L.DrawEvents.Deleted) => {};

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={cn(classes['leaflet-container'])}
      attributionControl={false}
    >
      <FeatureGroup>
        <EditControl
          position="topleft"
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
          }}
          onCreated={handleCreate}
          onEdited={handleEdit}
          onDeleted={handleDelete}
        />

        {areas.map((area) => {
          console.log(area.corners);
          return (
            <Polygon
              key={area.id}
              positions={area.corners}
              pathOptions={{
                color: area.borderColor,
                fillColor: area.fillColor,
                fillOpacity: 0.5,
                weight: 2,
              }}
            />
          );
        })}
      </FeatureGroup>

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AttributionControl position="topright" />
    </MapContainer>
  );
}
