import React, { useState } from "react";
import { Card } from "react-bootstrap";
import './simpleweather.css';

import sunnyIcon from '../image/weather/sunny.jpg';
import partlySunnyIcon from '../image/weather/partly_sunn.jpg';
import partlyCloudyIcon from '../image/weather/partly_cloudy.jpg';
import cloudyIcon from '../image/weather/cloudy.jpg';
import rainIcon from '../image/weather/rain.jpg';
import thunderstormIcon from '../image/weather/thunderstorm.jpg';
import snowIcon from '../image/weather/snow.jpg';
import fogIcon from '../image/weather/fog.jpg';
import windIcon from '../image/weather/wind.jpg';
import newIcon from '../image/weather/new.png';
import nodataIcon from '../image/weather/empty.png';

export const keywordsMap = { 
  sunny: ["sun", "clear"],
  partly_sunny: ["partly sunny", "mostly sunny"],
  partly_cloudy: ["partly cloudy", "mostly cloudy","a few clouds"],
  cloudy: ["cloudy", "overcast"],
  rain: ["rain", "showers", "drizzle"],
  thunderstorm: ["thunderstorm", "storm", "thunder"],
  snow: ["snow", "flurries", "sleet"],
  fog: ["fog", "mist", "haze", "smoke"],
  wind: ["wind", "breezy", "windy"],
  new:["considerable cloudiness."],
  nodata: ["no data"]
};

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
  new:newIcon,
  nodata: nodataIcon,
};

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

function SimpleWeather({ weather, onDayClick, tempUnit = '°C', windUnit = 'kilometer/hour' }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!weather) return <p className="px-3">Zgjidh një qytet për të parë motin</p>;
  const current = weather["v3-wx-observations-current"];
  if (!current) return <p className="px-3">Nuk ka të dhëna për motin</p>;
  const forecast = weather["v3-wx-forecast-daily-15day"];

  const allDays = [
    {
      dayOfWeek: "Today",
      iconCode: null,
      isNight: current.isNight,
      max: current.temperatureMax24Hour,
      min: current.temperatureMin24Hour,
      narrative: current.cloudCoverPhrase || "No data",
      windSpeed: current.windSpeed, // mund të përdoret më vonë
    },
    ...(forecast
      ? forecast.dayOfWeek.slice(1, 11).map((d, i) => ({
          dayOfWeek: d,
          iconCode: null,
          isNight: false,
          max: forecast.calendarDayTemperatureMax[i],
          min: forecast.calendarDayTemperatureMin[i],
          narrative: forecast.narrative[i] || "No data",
          windSpeed: forecast.windSpeed?.[i] || "-",
        }))
      : []),
  ];

  return (
    <div className="day-weather pt-4 px-3">
      <div className="d-flex flex-row flex-nowrap gap-3 overflow-auto">
        {allDays.map((day, i) => {
          const isActive = i === activeIndex;

          // Marr ikonën sipas narrative
          const iconSrc = getWeatherIconFromNarrative(day.narrative);

          // Konvertimi i temperaturës
          const displayMax = tempUnit === '°C' ? day.max : Math.round((day.max * 9/5) + 32);
          const displayMin = day.min != null ? (tempUnit === '°C' ? day.min : Math.round((day.min * 9/5) + 32)) : null;

          // Konvertimi i shpejtësisë së erës
          const displayWind = windUnit === 'kilometer/hour' ? day.windSpeed : Math.round(day.windSpeed / 1.609);

          return (
            <Card
              key={i}
              onClick={() => {
                setActiveIndex(i);
                if (onDayClick) onDayClick(day.dayOfWeek, day.narrative);
              }}
              className={`flex-shrink-0 border-0 shadow-sm ${isActive ? "active-card" : "inactive-card"}`}
              style={{
                minWidth: "250px",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              <div
                style={{
                  height: "4px",
                  backgroundColor: isActive ? "#FFC107" : "#FFD95A",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              ></div>

              <div className="p-3 d-flex justify-content-between align-items-start">
                <div className="d-flex flex-column align-items-center">
                  <span className="fw-bold fs-5 mb-2">{day.dayOfWeek}</span>

                  {/* Imazhi i motit */}
                  <img src={iconSrc} alt="weather icon" style={{ width: 50, height: 50 }} className="mb-2" />

                  <div className="temperature mb-1">
                    <span className="fs-5 fw-bold">{displayMax}{tempUnit}</span>
                    <span className="text-muted ms-1">{displayMin != null ? `${displayMin}${tempUnit}` : null}</span>
                  </div>

   
                </div>

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
