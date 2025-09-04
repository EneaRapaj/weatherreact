import React, { Fragment, useState } from 'react';
import NavbarComp from './Component/NavbarComp.js';
import LocationBox from './localbox/locationbox.js';
import './index.css';
import DataExchange from './DataExhange.js';
import Error from './Error.js';

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
  const [weather, setWeather] = useState(null); // ✅ ruaj weather

  const handleSelectLocation = (city, country, lat, lon) => {
    setSelectedCity(city);
    setSelectedCountry(country);

    fetchWeather(lat, lon).then((resp) => {
      setWeather(resp); // vendos weather kur kthehet nga API
    });
  };

  const onSubmit = (value) => {
    submitRequest(value);
  };

  return (
    <Fragment>
      <div className="App">
        <NavbarComp onSelectLocation={handleSelectLocation} submitSearch={onSubmit} />
        <LocationBox city={selectedCity} country={selectedCountry} weather={weather} />
        {isError && <Error message={isError} />}
      </div>
    </Fragment>
  );
}

export default App;
