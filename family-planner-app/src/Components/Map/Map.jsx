import { useRef, useState } from "react";
// import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
// import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import CloseIcon from '@mui/icons-material/Close';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Typography } from "@mui/material";

const center = { lat: 48.8584, lng: 2.2945 };

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAPS_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef();
  const destinationRef = useRef();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  return (
    <div className="flex justify-center">
      <div className="absolute mt-15 mb-10 w-full h-full">
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
      <div className="w-4/5 h-20 bg-white fixed top-18 flex flex-col">
        <div className="flex flex-row">
            <Autocomplete>
                <TextField size="small" placeholder="your location" ref={originRef} />
            </Autocomplete>
            <Autocomplete>
                <TextField size="small" placeholder="your destination" ref={destinationRef} />
            </Autocomplete>
            <Button onClick={calculateRoute}>Calculate Route</Button>
            <IconButton onClick={clearRoute}><CloseIcon /></IconButton>
        </div>
        <div className="flex flex-row justify-evenly">
            <Typography>Distance: {distance}</Typography>
            <Typography>Duration: {duration}</Typography>
            <IconButton onClick={() => {
                map.panTo(center)
                map.setZoom(15)
            }}><DirectionsIcon /></IconButton>
        </div>
      </div>
    </div>
  );
};

export default Map;
