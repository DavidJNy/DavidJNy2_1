import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function MapApp({onChatroomSelect}) {

  const locations = [
    {
      id: 1,
      name: "Brandford Park",
      position: [34.232914585138786, -118.42281737178092],
    },
    {
      id: 2,
      name: "Noho Park",
      position: [34.16629261944614, -118.3797576918089],
    },
    {
      id: 3,
      name: "Chase Park",
      position: [34.22816448607395, -118.4411504286388],
    },
    {
      id: 4,
      name: "El Cariso Park",
      position: [34.3172934409653, -118.41709515039359],
    },
    {
      id: 5,
      name: "Brace Canyon Park",
      position: [34.21179828856647, -118.32834988493849],
    },
    {
      id: 6,
      name: "Beeman Park",
      position: [34.15234469313562, -118.40772961964831],
    },
    {
      id: 7,
      name: "Sherman Oaks Park",
      position: [34.16098979340934, -118.44377709247786],
    },
    {
      id: 8,
      name: "Reseda Park",
      position: [34.187165524527074, -118.53300747322992],
    },
  ];

  const handleChatroomSelect = (chatroomId, chatroomName) => {
    onChatroomSelect(chatroomId, chatroomName);
  };

  return (
    <div id="Map" className="container pt-5">
      <MapContainer
        className="map-container"
        center={[34.2309, -118.3226]}
        zoom={11}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location, index) => (
          <Marker key={index} position={location.position}>
            <Popup>
              <Link onClick={() => handleChatroomSelect(location.id, location.name)}>
                {location.name}
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapApp;
