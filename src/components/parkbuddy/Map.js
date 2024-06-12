import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

let position = [34.2109, -118.2426]

/*
brandford park
34.232914585138786, -118.42281737178092

noho park
34.16629261944614, -118.3797576918089

chase park
34.22816448607395, -118.4411504286388

El Cariso Park
34.3172934409653, -118.41709515039359

Brace Canyon Park
34.21179828856647, -118.32834988493849

Beeman Park
34.15234469313562, -118.40772961964831

Sherman oaks Park
34.16098979340934, -118.44377709247786

Reseda Park
34.187165524527074, -118.53300747322992

*/



const MapApp = () => (
  <div id='Map' className='container pt-5'>
    <MapContainer style={{ height: "50vh" }} center={position} zoom={11} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[34.232073991641926, -118.42286668315286]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  </div>

);

export default MapApp;