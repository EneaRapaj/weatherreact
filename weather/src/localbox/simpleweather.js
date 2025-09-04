import React, { useState } from "react";
import { Card } from "react-bootstrap";
import './simpleweather.css';


const getIconUrl = (iconCode, isNight = false) => {
  if (iconCode == null || isNaN(iconCode)) {
    return "https://s.w-x.co/staticmaps/wu/icons/0.png";
  }
  if (isNight && iconCode < 30) {
    iconCode += 30;
  }
  return `https://s.w-x.co/staticmaps/wu/icons/${iconCode}.png`;
};

function SimpleWeather({ weather, onDayClick  }) {
  const [activeIndex, setActiveIndex] = useState(0); // 0 = Today është aktiv fillimisht
  

  if (!weather) return <p className="px-3">Zgjidh një qytet për të parë motin</p>;

  const current = weather["v3-wx-observations-current"];
  if (!current) return <p className="px-3">Nuk ka të dhëna për motin</p>;


  const forecast = weather["v3-wx-forecast-daily-15day"];

  

  // Kombino Today + forecast në një array të vetëm për thjeshtësi
  const allDays = [
    {
      dayOfWeek: "Today",
      iconCode: current.iconCode,
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

        return (
          <Card
            key={i}
            onClick={() => {
              setActiveIndex(i);
              if (onDayClick) {
              onDayClick(day.dayOfWeek);
              }

            }}
            className={`flex-shrink-0 border-0 shadow-sm ${
              isActive ? "active-card" : "inactive-card"
            }`}
            style={{
              minWidth: "250px",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            {/* Shirit i verdhë */}
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
                  src={getIconUrl(day.iconCode, day.isNight)}
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

              {/* Kolona e dytë → shfaqet vetëm nëse është aktiv */}
              {isActive && (
                <div
                  className="d-flex align-items-center ms-3"
                  style={{ maxWidth: "100px" }}
                >
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
