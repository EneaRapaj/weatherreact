import React, { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './weatherService';
import diellBg from "./image/diell.png";
import snowBg from "./image/snow.jpg";
import sunBg from "./image/sun.png";


function App() {
  
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Paris");
  const [bg, setBg] = useState();
  // city sheben per qytetin , weather per te perditesuar te dhenat shfaqen dom, bg per formatuar imazhin

  useEffect( ()=> {

    const fetchWeatherData = async () => {
    
      const data = await getFormattedWeatherData (city);
      setWeather(data);

       // dynamic bg
       
       
       if (data.weather[0].description == 'clear sky') setBg(diellBg);
       
       if(data.weather[0].description == 'light snow')setBg(snowBg);

       if(data.weather[0].description !== 'light snow'&& data.weather[0].description !== 'clear sky')setBg(sunBg);
    };
    fetchWeatherData();
  },[city]);
  // sherben per te bere perditsimet kur kerkojme te formatohen te dhenat dhe modifikohet imazhi sipas if-ve.
 
  const enterKeyPressed = (e) => {
      
    if(e.keyCode === 13){
     
      setCity(e.currentTarget.value);
      document.querySelector(".weather").classList.remove("loading");
    }
   
  }
 
 

  return (
    
    <div className='body'  style={{ backgroundImage: `url(${bg})` } }>
    { weather  && (
      <div className="card  "> 
     
     <div className="search">

         <input type="text" className="search-bar"  name='city' placeholder="search" onKeyDown={enterKeyPressed} />
         {/* <button className="button"  ><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1.7em" xmlns="http://www.w3.org/2000/svg"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg></button> */}
         
     </div>
      <div className="weather loading">
         <h2 className="city"> Weather in {`${weather.name} ,  ${weather.country} `}</h2>
      <h1 className="temp">{`${weather.temp.toFixed()} °C` }  </h1>
      <img src={weather.iconURL} alt="" className="icon"/>
      <div className="description"> {weather.description}</div>
      <div className="humidity">Humidity: {weather.humidity}%</div>
      <div className="wind"> Wind speed : {weather.speed} km/h</div>
 
      </div>
     </div>
    )}
    </div>
   
  );
}

export default App;
