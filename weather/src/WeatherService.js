import { DateTime } from "luxon";

const API_KEY= "8d7d144f466d307e86bddeff99afe171";
// 3982a3832541d532bda13f09a1b9bca5
// 2d1da235e83744989ce7838187998333
const BASE_URL= "https://api.openweathermap.org/data/2.5/";


// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exlude=current,minutely,horly,alerts&appid=3982a3832541d532bda13f09a1b9bca5&units= metric
const getWeatherData = (infoType,searchParams) => {
    
    const url = new URL(BASE_URL + "/"+ infoType);
    url.search = new URLSearchParams({...searchParams, 
        appid:API_KEY});

       

        return fetch(url).then((res)=> res.json())
        .then((data)=>data);
};

 const formatCurrentWeather = (data)=> {
       
    const {

        coord: {lat,lon},
        main : {temp, feels_like, temp_min, temp_max, pressure, humidity, visibility},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed}
    } = data

    const {main: details, icon} = weather[0];

    return {lat,
        lon,
        temp,
         feels_like, 
         temp_min, 
         temp_max, 
         pressure, 
         humidity, 
         visibility, 
         name,
        dt,country,
         sunrise,
          sunset, 
          speed,
          details,
           icon}
 }


  const formatForcastWeather = (data) => {

    let {timezone, daily, horly } = data;
    console.log('daily: ', daily); 
//     daily = daily.slice(1,6).map(d =>{
//          return {
//             title: formatToLocalTime (d.dt, timezone, 'ccc'),
//             temp: d.temp.day ,
//             icon: d.weather[0].icon
//          }

//     } );

//     horly = daily.slice(1,6).map(d =>{
//         return {
//            title: formatToLocalTime (d.dt, timezone, 'hh:mm:a'),
//            temp: d.temp.day ,
//            icon: d.weather[0].icon
//         }
//    } );
   
//    return { timezone, daily, horly};
  };

 export const getFormattedWeatherData  = async (searchParams) => {
    
    const formattedCurrentWeather = await getWeatherData('weather',searchParams).then(formatCurrentWeather)

    const {lat, lon}= formatCurrentWeather; 
    const formattedForecastWeather = await getWeatherData("onecall",{
        lat,
        lon,
        exlude : "current, minutely,alerts",
        units : searchParams.units,
    })
     .then(formatForcastWeather)
    

    return formattedCurrentWeather ;
}

const formatToLocalTime = (secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time:hh:mm:a"
    ) => DateTime.fromSeconds().setZone(zone).toFormat(format);

 const iconUrlFromCode =  (code) => `http://openweathermap.org/img/wn/${code}@2x.png`
// export default getFormattedWeatherData
export { formatToLocalTime, iconUrlFromCode };