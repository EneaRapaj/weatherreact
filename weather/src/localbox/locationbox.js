import React, { useState } from 'react';
import SimpleWeather from '../localbox/simpleweather.js';
import Hourly from './horly.js';
import FirstConatainer from '../localbox/firstcontainer.js';
import Result from '../localbox/result.js';
import Setting from '../localbox/setting.js';

function LocationBox({ city, country, weather, onChangeBackground,narrative }) {
  const [selectedDay, setSelectedDay] = useState("Today");   
  const [tempUnit, setTempUnit] = useState("°C");
  const [windUnit, setWindUnit] = useState("kilometer/hour");

  // Ky funksion merr njësitë nga Setting dhe i ruan në state
  const handleUnitChange = (temp, wind) => {
    setTempUnit(temp);
    setWindUnit(wind);
  };
  return (
    <div className="location-box">
      <div className="location">
        {city && country ? `${city}, ${country}` : "Zgjidh një qytet"}
      </div>
      <div className="date">{new Date().toDateString()}</div>

      <SimpleWeather
        weather={weather}
        onDayClick={(day, narrative) => {
          setSelectedDay(day);
          if (onChangeBackground) onChangeBackground(narrative);
        }} 

        tempUnit={tempUnit}
        windUnit={windUnit}
      />


      <Hourly
        weather={weather}
        selectedDay={selectedDay}
        isActive={true}
        tempUnit={tempUnit}
        windUnit={windUnit}
      />
      <FirstConatainer weather={weather} />
      <Result weather={weather} 
        tempUnit={tempUnit}
        windUnit={windUnit}/>
      <Setting onUnitChange={handleUnitChange} />

      


    </div>
  );
}

export default LocationBox;
