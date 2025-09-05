import React, { useState } from 'react';
import SimpleWeather from '../localbox/simpleweather.js';
import Hourly from './horly.js';
import FirstConatainer from '../localbox/firstcontainer.js';
import Result from '../localbox/result.js';
import Setting from '../localbox/setting.js';

function LocationBox({ city, country, weather, current }) {
  const [selectedDay, setSelectedDay] = useState("Today"); // dita e klikuar, default Today
   
  return (
    <div className="location-box">
      <div className="location">
        {city && country ? `${city}, ${country}` : "Zgjidh një qytet"}
      </div>
      <div className="date">{new Date().toDateString()}</div>

      {/* SimpleWeather merr onDayClick për të përcjellë dita e klikuar */}
      <SimpleWeather 
        weather={weather} 
        onDayClick={(day) => setSelectedDay(day)} 
      />

      <Hourly weather={weather} selectedDay={selectedDay}  />


      <FirstConatainer weather={weather}  />
      <Result weather={weather} />

      <Setting />
    </div>
  );
}

export default LocationBox;
