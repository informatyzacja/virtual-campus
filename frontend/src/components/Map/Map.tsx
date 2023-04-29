import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-easybutton/src/easy-button.js';
import 'leaflet-easybutton/src/easy-button.css';

import type { GeoJsonObject } from 'geojson';
import type { Layer } from 'leaflet';
import L from 'leaflet';
import { useCallback } from 'react';
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import mapData from '@/components/Map/mapData.json';

const Map = () => {
  const mapContainerRef = useCallback((reference: L.Map) => {
    // Creates a button that centers the map on the User's location
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!reference) {
      return;
    }

    L.easyButton('<faMapMarker/>', () => {
      // eslint-disable-next-line @cspell/spellchecker
      reference.locate().on('locationfound', function (e) {
        // setPosition()
        // eslint-disable-next-line @cspell/spellchecker
        reference.flyTo(e.latlng, reference.getZoom());
      });
    }).addTo(reference);
  }, []);

  return (
    <MapContainer
      center={[51.10888547242358, 17.060051620079904]}
      zoom={17}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
      ref={mapContainerRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <GeoJSON onEachFeature={onEachFeature} data={mapData as GeoJsonObject} />

      <Marker
        position={[51.1091064802161, 17.06046003426282]}
        draggable={false}
        // animate={true}
      >
        <Popup>C-1</Popup>
      </Marker>
    </MapContainer>
  );
};

function onEachFeature(feature: GeoJSON.Feature, layer: Layer) {
  if (feature.properties?.name) {
    layer.bindPopup(feature.properties.name as string);
  }
}

export default Map;
