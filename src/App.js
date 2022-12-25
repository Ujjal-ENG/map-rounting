import React, { useEffect, useState, useRef } from "react";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";

import "./App.css";

function App() {
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [longitude, setLongitude] = useState(-0.112869);
  const [latitude, setLatitude] = useState(51.504);
  useEffect(() => {
    let map = tt.map({
      key: process.env.REACT_APP_TOM,
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      center: [longitude, latitude],
      zoom: 14,
    });

    setMap(map);

    const addMarker = () => {
      const popupOffset = {
        bottom: [0, -25],
      };
      const popup = new tt.Popup({ offset: popupOffset }).setHTML(
        "This is you!!!"
      );
      const element = document.createElement("div");
      element.className = "marker";
      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);

      marker.on("dragend", () => {
        const lnglat = marker.getLngLat();
        setLongitude(lnglat.lng);
        setLatitude(lnglat.lat);
      });

      marker.setPopup(popup).togglePopup();
    };

    addMarker();


    return () => map.remove();
  }, [longitude, latitude]);

  return (
    <>
      {map && (
        <div className="app">
          <div ref={mapElement} className="map" />
          <div className="search-bar">
            <h1>Where to???</h1>
            <input
              type="text"
              id="longitude"
              className="longitude"
              placeholder="Put in Longitude"
              onChange={(e) => setLongitude(e.target.value)}
            />
            <input
              type="text"
              id="latitude"
              className="latitude"
              placeholder="Put in Latitude"
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
