import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

import type { GeoJsonObject } from 'geojson';
import type { Layer } from 'leaflet';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';

import mapData from '@/components/Map/mapData.json';

const Map = () => {
  return (
    <MapContainer
      center={[51.10888547242358, 17.060051620079904]}
      zoom={17}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <GeoJSON onEachFeature={onEachFeature} data={mapData as GeoJsonObject} />
    </MapContainer>
  );
};

function onEachFeature(feature: GeoJSON.Feature, layer: Layer) {
  if (feature.properties?.name) {
    layer.bindPopup(feature.properties.name as string);
  }
}

export default Map;
