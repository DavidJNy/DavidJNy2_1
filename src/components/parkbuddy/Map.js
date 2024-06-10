import React from 'react';
// import {APIProvider, Map} from '@vis.gl/react-google-maps';

const API_KEY = process.env.GOOGLEMAP_API_KEY;


    console.log('Your API Key:', API_KEY);

const MapApp = () => (
    <div>
      
    </div>
  // <APIProvider apiKey={API_KEY}>
  //   <Map
  //     style={{width: '100vw', height: '100vh'}}
  //     defaultCenter={{lat: 22.54992, lng: 0}}
  //     defaultZoom={3}
  //     gestureHandling={'greedy'}
  //     disableDefaultUI={true}
  //   />
  // </APIProvider>
);

export default MapApp;