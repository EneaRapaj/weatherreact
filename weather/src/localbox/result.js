import React from "react";
import "./result.css";

function Result({ weather, tempUnit = "°C", windUnit = "kilometer/hour" }) {
  if (!weather) return null;

  const current = weather["v3-wx-observations-current"];
  const locationPoint = weather["v3-location-point"];

  // Konvertimi i temperaturës aktuale
  const displayTemp =
    tempUnit === "°C"
      ? current.temperature
      : Math.round((current.temperature * 9) / 5 + 32);

  // Konvertimi i shpejtësisë së erës
  const displayWind =
    windUnit === "kilometer/hour"
      ? current.windSpeed
      : Math.round(current.windSpeed / 1.609);

  // Koordinatat
  const latitude = locationPoint?.location?.latitude;
  const longitude = locationPoint?.location?.longitude;
  const stationName = locationPoint?.location?.displayName || "Unknown";

  return (
    <div className="Observations">
      <p>Observations</p>

      <div className="max-temp">
        <p className="celsius">
          {displayTemp}{tempUnit}
        </p>

        <div className="wind">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/wind.png"
            alt="wind icon"
            style={{ width: "24px", height: "24px", marginRight: "6px" }}
          />
          <p className="mb-1">
            <strong>Wind Speed:</strong> {displayWind}{" "}
            {windUnit === "kilometer/hour" ? "km/h" : "mph"}
          </p>
        </div>
      </div>

      <div className="me-2">
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
          <p>Observation Station: {stationName}</p>
          <div className="Lat-Lon">
            <p>Lat: {latitude}, Long: {longitude}</p>
            <p>Longitude: {longitude}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
