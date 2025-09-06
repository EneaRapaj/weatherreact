import React, { Fragment, useState, useEffect } from 'react';
import NavbarComp from './Component/NavbarComp.js';
import LocationBox from './localbox/locationbox.js';
import './index.css';
import DataExchange from './DataExhange.js';
import Error from './Error.js';

// Imazhet e sfondit
import diell from './image/diell.png';
import sunny from './image/sun.png';
import storm from './image/storm.jpg';
import nodata from './image/empty.jpg';

// Importojmë keywordsMap nga SimpleWeather
import { keywordsMap } from './localbox/simpleweather.js';

// Map për sfond bazuar te keywordsMap
const bgMap = {
  sunny: diell,
  partly_sunny: diell,
  partly_cloudy: sunny,
  cloudy: sunny,
  rain: storm,
  thunderstorm: storm,
  snow: storm,
  fog: storm,
  wind: storm,
  new:storm,
  nodata: nodata

};

function App() {
  const {
    isError,
    isLoading,
    weather: dataWeather,
    submitRequest,
    fetchWeather
  } = DataExchange();

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [weather, setWeather] = useState(null); 
  const [background, setBackground] = useState(diell);

  const handleSelectLocation = (city, country, lat, lon) => {
    setSelectedCity(city);
    setSelectedCountry(country);

    fetchWeather(lat, lon).then((resp) => {
      setWeather(resp);
    });
  };

  const onSubmit = (value) => {
    submitRequest(value);
  };

  // Funksioni për ndryshim sfondi sipas narrative
  const changeBackgroundFromNarrative = (narrative) => {
    if (!narrative) return setBackground(nodata);
    const lowerNarrative = narrative.toLowerCase();

    for (const key in keywordsMap) {
      if (keywordsMap[key].some(keyword => lowerNarrative.includes(keyword))) {
        setBackground(bgMap[key]);
        return;
      }
    }
    setBackground(storm); // default për të gjitha të tjerat
  };

  // Ndryshon sfondin automatikisht kur weather ndryshon
  useEffect(() => {
    if (!weather) return;

    const current = weather["v3-wx-observations-current"];
    const narrative = current?.cloudCoverPhrase || "";

    changeBackgroundFromNarrative(narrative);
  }, [weather]);

  return (
    <Fragment>
      <div
        className="App"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "190vh",
          height: "52vh",
          transition: "background 0.5s ease-in-out"
        }}
      >
        <NavbarComp onSelectLocation={handleSelectLocation} submitSearch={onSubmit} />
        <LocationBox
          city={selectedCity}
          country={selectedCountry}
          weather={weather}
          onChangeBackground={changeBackgroundFromNarrative}
        />
        {isError && <Error message={isError} />}
      </div>
    </Fragment>
  );
}

export default App;
