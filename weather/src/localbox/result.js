import React from "react";

function Result({ weather }) {
  if (!weather) return null;

  const current = weather["v3-wx-observations-current"];
  const locationPoint = weather["v3-location-point"];

  // nxjerr latitude dhe longitude nga id


  return (
    <div className="Observations">
      <p>Observations</p>

      <div className="max-temp">
        <p className="celsius">{current.temperature}°</p>

        <img
          src="https://img.icons8.com/ios-filled/50/000000/wind.png"
          alt="wind icon"
          style={{ width: "24px", height: "24px", marginRight: "6px" }}
        />
        <p className="mb-1">
          <strong>Wind Speed:</strong> {current.windSpeed} km/h
        </p>
      </div>


      <div className=" me-2">
        <div className="result">
          <p className="Humidity">
            <strong>Humidity:</strong> {current.relativeHumidity}%
          </p>
          <p className="Visibility">
            <strong>Visibility:</strong> {Math.round(current.visibility)} km
          </p>
          <p className="Pressure">
            <strong>Pressure:</strong>{" "}
            {Math.round(current.pressureMeanSeaLevel)} mb
          </p>
        </div>

        <hr />

        <div className="coordinates">
          <p>Observation Station: {locationPoint?.location?.displayName || "Unknown"}</p>
          <div className="Lat-Lon">
            <div className="Lat">
              <p>(Lat: {locationPoint?.location?.latitude })</p>
            </div>
            <div>
              <p>Long: {locationPoint?.location?.longitude}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
