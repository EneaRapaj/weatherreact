import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

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
  nodata: ["no data"],
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
  nodata: nodataIcon,
};

const getWeatherIconFromPhrase = (phrase) => {
  if (!phrase) return iconMap.nodata;
  const lowerPhrase = phrase.toLowerCase();
  for (const key in keywordsMap) {
    if (keywordsMap[key].some((keyword) => lowerPhrase.includes(keyword))) {
      return iconMap[key];
    }
  }
  return iconMap.nodata;
};

function Hourly({ weather, selectedDay, isActive, tempUnit = '°C', windUnit = 'kilometer/hour' }) {
  const [hourlyData, setHourlyData] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null);

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
        wxPhraseLong: forecastHourly.wxPhraseLong?.[idx] ?? "No data",
        windDirCardinal: forecastHourly.windDirectionCardinal?.[idx] ?? "-",
      })) || [];

    const filteredHours = dailyHours.filter((item) => {
      const date = new Date(item.time);
      const dayString = date.toLocaleDateString("en-US", { weekday: "long" });
      return dayString === selectedDay || (selectedDay === "Today" && date.toDateString() === new Date().toDateString());
    });

    setHourlyData(filteredHours);
    setSelectedHour(null);
  }, [weather, selectedDay]);

  return (
    <div className="d-flex flex-row flex-nowrap gap-3 overflow-auto px-3 pb-3">
      {hourlyData.map((item, i) => {
        const iconSrc = getWeatherIconFromPhrase(item.wxPhraseLong);

        const displayTemp = tempUnit === '°C' ? item.temp : Math.round((item.temp * 9/5) + 32);
        const displayFeelsLike = tempUnit === '°C' ? item.feelsLike : Math.round((item.feelsLike * 9/5) + 32);
        const displayWind = windUnit === 'kilometer/hour' ? item.windSpeed : Math.round(item.windSpeed / 1.609);

        return (
          <div key={i} className="d-flex flex-row gap-2">
            <Card
              className={`flex-shrink-0 border-0 shadow-sm ${selectedHour?.time === item.time ? "border-primary" : ""}`}
              style={{ minWidth: "180px", borderRadius: "12px", cursor: "pointer" }}
              onClick={() => setSelectedHour(selectedHour?.time === item.time ? null : item)}
            >
              <div
                style={{
                  height: "4px",
                  backgroundColor: selectedHour?.time === item.time ? "#FFC107" : "#FFD95A",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              ></div>

              <div className="p-2 d-flex flex-column align-items-center">
                <p className="time mb-1">{new Date(item.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                <img src={iconSrc} alt="weather icon" style={{ width: 40, height: 40 }} className="mb-1" />
                <p className="fw-bold mb-1">{displayTemp}{tempUnit}</p>
                <p className="mb-0 small">☁️ {item.cloudCover}%</p>
                <p className="mb-0 small">💨 {displayWind} {windUnit}</p>
              </div>
            </Card>

            {selectedHour?.time === item.time && (
              <Card
                className="flex-shrink-0 border-0 shadow-sm"
                style={{ minWidth: "200px", borderRadius: "12px", backgroundColor: isActive ? "#FFC107" : "#FFD95A" }}
              >
                <div className="p-3 text-start small">
                  <h6 className="fw-bold mb-2">Details</h6>
                  <p>Condition: {item.wxPhraseLong}</p>
                  <p>Humidity: {item.humidity}%</p>
                  <p>Pressure: {Math.round(item.pressure)} hPa</p>
                  <p>Visibility: {item.visibility} km</p>
                  <p>Feels like: {displayFeelsLike}{tempUnit}</p>
                  <p>Precipitation: {item.precipitation}%</p>
                  <p>Wind directed: {item.windDirCardinal} ({item.wind})°</p>
                </div>
              </Card>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Hourly;
