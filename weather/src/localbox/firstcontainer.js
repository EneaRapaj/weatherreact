import React from "react";
import hourImage from "../image/hour.jpg"; // Siguro që path-i është i saktë
import Sunrise from "../image/sunrise.png";

// SVG Icons as React components
const UVIcons = {
  low: (
    <svg width="50" height="50" viewBox="0 0 24 24" fill="#4CAF50" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" />
      <text x="12" y="16" fontSize="8" textAnchor="middle" fill="white">Low</text>
    </svg>
  ),
  moderate: (
    <svg width="50" height="50" viewBox="0 0 24 24" fill="#FF9800" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" />
      <text x="12" y="16" fontSize="8" textAnchor="middle" fill="white">Mod</text>
    </svg>
  ),
  high: (
    <svg width="50" height="50" viewBox="0 0 24 24" fill="#F44336" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" />
      <text x="12" y="16" fontSize="8" textAnchor="middle" fill="white">High</text>
    </svg>
  ),
  veryHigh: (
    <svg width="50" height="50" viewBox="0 0 24 24" fill="#D32F2F" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" />
      <text x="12" y="16" fontSize="8" textAnchor="middle" fill="white">V.High</text>
    </svg>
  ),
  extreme: (
    <svg width="50" height="50" viewBox="0 0 24 24" fill="#9C27B0" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" />
      <text x="12" y="16" fontSize="7" textAnchor="middle" fill="white">Extreme</text>
    </svg>
  ),
  na: (
    <svg width="50" height="50" viewBox="0 0 24 24" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" />
      <text x="12" y="16" fontSize="7" textAnchor="middle" fill="white">N/A</text>
    </svg>
  )
};

// Funksioni për të zgjedhur ikonën sipas përshkrimit UV
function getUVIcon(uvDescription) {
  if (!uvDescription) return UVIcons.na;

  switch (uvDescription.toLowerCase()) {
    case "low":
      return UVIcons.low;
    case "moderate":
      return UVIcons.moderate;
    case "high":
      return UVIcons.high;
    case "very high":
      return UVIcons.veryHigh;
    case "extreme":
      return UVIcons.extreme;
    default:
      return UVIcons.na;
  }
}

function FirstContainer({ weather }) {
  if (!weather) return null;

  const current = weather["v3-wx-observations-current"];
  if (!current) return null;

  const lastUpdated = current.validTimeLocal
    ? new Date(current.validTimeLocal).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "N/A";

  const sunrise = current.sunriseTimeLocal
    ? new Date(current.sunriseTimeLocal).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "N/A";

  const sunset = current.sunsetTimeLocal
    ? new Date(current.sunsetTimeLocal).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "N/A";

  // Merr uvDescription nga current
  const uv = current.uvDescription || "N/A";

  return (
    <div className="container1">
      <div className="qualitysun">
        <div className="uv-icon">{getUVIcon(uv)}</div>  {/* Përdor uv këtu */}
        <p className="UV">{uv}</p>
      </div>

      <div className="second-div mt-6">
        <div className="seconddiv">
          <div className="updated display-flex">
            <img
              src={hourImage}
              alt="time image"
              className="time"
              style={{ width: "32px", height: "32px", objectFit: "contain" }}
            />
            <p>Last updated today at {lastUpdated}</p>
          </div>

          <div className="SunSet display-flex">
           <img
              src={Sunrise}
              alt="time image"
              className="time"
              style={{ width: "32px", height: "32px", objectFit: "contain" }}
            /> 
            <p>
              <strong>Sunrise {sunrise}</strong>
            </p>
            <p>Sunset {sunset}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default FirstContainer;
