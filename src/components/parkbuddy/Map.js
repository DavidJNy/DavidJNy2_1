import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const locations = [
  { name: 'Brandford Park', position: [34.232914585138786, -118.42281737178092] },
  { name: 'Noho Park', position: [34.16629261944614, -118.3797576918089] },
  { name: 'Chase Park', position: [34.22816448607395, -118.4411504286388] },
  { name: 'El Cariso Park', position: [34.3172934409653, -118.41709515039359] },
  { name: 'Brace Canyon Park', position: [34.21179828856647, -118.32834988493849] },
  { name: 'Beeman Park', position: [34.15234469313562, -118.40772961964831] },
  { name: 'Sherman Oaks Park', position: [34.16098979340934, -118.44377709247786] },
  { name: 'Reseda Park', position: [34.187165524527074, -118.53300747322992] }
];

const MapApp = () => (
  <div id='Map' className='container pt-5'>
    <MapContainer className='map-container' center={[34.2309, -118.3226]} zoom={11} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, index) => (
        <Marker key={index} position={location.position}>
          <Popup>
            {location.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  </div>
);

export default MapApp;
