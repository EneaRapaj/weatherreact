import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

function Hourly({ weather, selectedDay, isActive }) {
  const [hourlyData, setHourlyData] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null); // ora e zgjedhur

  useEffect(() => {
    if (!weather) return;

    const forecastHourly = weather["v3-wx-forecast-hourly-10day"];
    if (!forecastHourly) return;

    const dailyHours =
      forecastHourly.validTimeLocal?.map((time, idx) => ({
        time,
        temp: forecastHourly.temperature?.[idx] ?? "-",
        feelsLike: forecastHourly.temperatureFeelsLike?.[idx] ?? "-",
        humidity: forecastHourly.relativeHumidity?.[idx] ?? "-",
        precipitation: forecastHourly.precipChance?.[idx] ?? "-",
        wind: forecastHourly.windDirection?.[idx] ?? "-",
        windSpeed: forecastHourly.windSpeed?.[idx] ?? "-",
        visibility: forecastHourly.visibility?.[idx] ?? "-",
        pressure: forecastHourly.pressureMeanSeaLevel?.[idx] ?? "-",
        cloudCover: forecastHourly.cloudCover?.[idx] ?? "-",
        iconCode: forecastHourly.iconCode?.[idx] ?? null,
        windDirCardinal: forecastHourly.windDirectionCardinal?.[idx] ?? "-",
      })) || [];

    const filteredHours = dailyHours.filter((item) => {
      const date = new Date(item.time);
      const dayString = date.toLocaleDateString("en-US", { weekday: "long" });
      return (
        dayString === selectedDay ||
        (selectedDay === "Today" &&
          date.toDateString() === new Date().toDateString())
      );
    });

    setHourlyData(filteredHours);
    setSelectedHour(null); // reset kur ndryshon dita
  }, [weather, selectedDay]);

  if (!hourlyData || hourlyData.length === 0) {
    return <p className="px-3">No hourly data available</p>;
  }

  return (
    <div className="d-flex flex-row flex-nowrap gap-3 overflow-auto px-3 pb-3">
      {hourlyData.map((item, i) => (
        <div key={i} className="d-flex flex-row gap-2">
          {/* Card kryesor i orës */}
          <Card
            className={`flex-shrink-0 border-0 shadow-sm ${
              selectedHour?.time === item.time ? "border-primary" : ""
            }`}
            style={{
              minWidth: "180px",
              borderRadius: "12px",
              cursor: "pointer",
            }}
            onClick={() =>
              setSelectedHour(selectedHour?.time === item.time ? null : item)
            }
          >
            {/* Shirit i verdhë për kartën e klikuar */}
            <div
              style={{
                height: "4px",
                backgroundColor:
                  selectedHour?.time === item.time ? "#FFC107" : "#FFD95A",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              }}
            ></div>

            <div className="p-2 d-flex flex-column align-items-center">
              <p className="time mb-1">
                {new Date(item.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              {item.iconCode && (
                <img
                  src={`https://s.w-x.co/staticmaps/wu/icons/${item.iconCode}.png`}
                  alt="weather icon"
                  style={{ width: 40, height: 40 }}
                  className="mb-1"
                />
              )}

              <p className="fw-bold mb-1">{item.temp}°C</p>
              <p className="mb-0 small">☁️ {item.cloudCover}%</p>
              <p className="mb-0 small">💨 {item.windSpeed} km/h</p>
            </div>
          </Card>

         
          {/* Card i detajeve që hapet ngjitur */}
          {selectedHour?.time === item.time && (
            <Card
            
              className="flex-shrink-0 border-0 shadow-sm"
              style={{ minWidth: "200px", borderRadius: "12px", backgroundColor: isActive ? "#FFC107" : "#FFD95A" }}
            >
              <div className="p-3 text-start small">
                <h6 className="fw-bold mb-2">Details</h6>
                <p>Humidity: {item.humidity}%</p>
                <p>Pressure:  {Math.round(item.pressure)}  hPa</p>
                <p>Visibility: {item.visibility} km</p>
                <p>Feels like: {item.feelsLike}°C</p>
                <p>Precipitation: {item.precipitation}%</p>
                <p>
                  Wind directed: {item.windDirCardinal} ({item.wind})°
                </p>
              </div>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
}

export default Hourly;
