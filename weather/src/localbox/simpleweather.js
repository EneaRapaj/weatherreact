import React, { useState } from "react";
import { Card } from "react-bootstrap";
import './simpleweather.css';

// Nëse SimpleWeather është në src/localbox/SimpleWeather.js
import sunnyIcon from '../image/weather/sunny.jpg';
import partlySunnyIcon from '../image/weather/partly_sunn.jpg';
import partlyCloudyIcon from '../image/weather/partly_cloudy.jpg';
import cloudyIcon from '../image/weather/cloudy.jpg';
import rainIcon from '../image/weather/rain.jpg';
import thunderstormIcon from '../image/weather/thunderstorm.jpg';
import snowIcon from '../image/weather/snow.jpg';
import fogIcon from '../image/weather/fog.jpg';
import windIcon from '../image/weather/wind.jpg';
import nodataIcon from '../image/weather/empty.png';


// Fjalët kyçe për të lidhur narrative me ikonat
const keywordsMap = { 
  sunny: ["sun", "clear"],
  partly_sunny: ["partly sunny", "mostly sunny"],
  partly_cloudy: ["partly cloudy", "mostly cloudy"],
  cloudy: ["cloudy", "overcast"],
  rain: ["rain", "showers", "drizzle"],
  thunderstorm: ["thunderstorm", "storm", "thunder"],
  snow: ["snow", "flurries", "sleet"],
  fog: ["fog", "mist", "haze", "smoke"],
  wind: ["wind", "breezy", "windy"],
  nodata: ["no data"]
};

// Map për të lidhur çelësat me ikonat
const iconMap = {
  sunny: sunnyIcon,
  partly_sunny: partlySunnyIcon,
  partly_cloudy: partlyCloudyIcon,
  cloudy: cloudyIcon,
  rain: rainIcon,
  thunderstorm: thunderstormIcon,
  snow: snowIcon,
  fog: fogIcon,
  wind: windIcon,
  nodata: nodataIcon,
};

// Funksioni për ikonë nga narrative
const getWeatherIconFromNarrative = (narrative) => {
  if (!narrative) return iconMap.nodata;
  const lowerNarrative = narrative.toLowerCase();

  for (const key in keywordsMap) {
    if (keywordsMap[key].some(keyword => lowerNarrative.includes(keyword))) {
      return iconMap[key];
    }
  }
  return iconMap.nodata;
};

function SimpleWeather({ weather, onDayClick }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!weather) return <p className="px-3">Zgjidh një qytet për të parë motin</p>;

  const current = weather["v3-wx-observations-current"];
  if (!current) return <p className="px-3">Nuk ka të dhëna për motin</p>;

  const forecast = weather["v3-wx-forecast-daily-15day"];

  // Kombino Today + forecast në një array
  const allDays = [
    {
      dayOfWeek: "Today",
      iconCode: null, // përdor narrative, jo iconCode
      isNight: current.isNight,
      max: current.temperatureMax24Hour,
      min: current.temperatureMin24Hour,
      narrative: current.cloudCoverPhrase || "No data",
    },
    ...(forecast
      ? forecast.dayOfWeek.slice(1, 10).map((d, i) => ({
          dayOfWeek: d,
          iconCode: null,
          isNight: false,
          max: forecast.calendarDayTemperatureMax[i],
          min: forecast.calendarDayTemperatureMin[i],
          narrative: forecast.narrative[i] || "No data",
        }))
      : []),
  ];

  return (
    <div className="day-weather pt-4 px-3">
      <div className="d-flex flex-row flex-nowrap gap-3 overflow-auto">
        {allDays.map((day, i) => {
          const isActive = i === activeIndex;

          // Nëse iconCode s’është -> përdor narrative
          const iconSrc = day.iconCode != null 
            ? nodataIcon 
            : getWeatherIconFromNarrative(day.narrative);

          return (
            <Card
              key={i}
              onClick={() => {
                setActiveIndex(i);
                if (onDayClick) onDayClick(day.dayOfWeek);
              }}
              className={`flex-shrink-0 border-0 shadow-sm ${isActive ? "active-card" : "inactive-card"}`}
              style={{
                minWidth: "250px",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              {/* Shirit i verdhë sipër */}
              <div
                style={{
                  height: "4px",
                  backgroundColor: isActive ? "#FFC107" : "#FFD95A",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              ></div>

              <div className="p-3 d-flex justify-content-between align-items-start">
                {/* Kolona e parë */}
                <div className="d-flex flex-column align-items-center">
                  <span className="fw-bold fs-5 mb-2">{day.dayOfWeek}</span>
                  <img
                    src={iconSrc}
                    alt="weather icon"
                    style={{ width: 50, height: 50 }}
                    className="mb-2"
                  />
                  <div className="temperature mb-1">
                    <span className="fs-5 fw-bold">{day.max}°C</span>
                    <span className="text-muted ms-1">
                      {day.min != null ? `${day.min}°C` : null}
                    </span>
                  </div>
                </div>

                {/* Narrative vetëm kur karta është aktive */}
                {isActive && (
                  <div className="d-flex align-items-center ms-3" style={{ maxWidth: "100px" }}>
                    <em className="text-muted small">{day.narrative}</em>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default SimpleWeather;
