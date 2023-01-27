const API_KEY = '3982a3832541d532bda13f09a1b9bca5';

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (city) => {

    const URL =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  // adresa ndiqet ashtu sic eshte te serveri hap pas hapi pa bere hapsira kujdes ato ki parasysh underline
    const data = await fetch (URL)
    .then((response)=> {if (!response.ok) {
      alert("No weather found, write correctly name place.");
      throw new Error("No weather found write correctly name place.");
    }
    return response.json();})
    .then((data)=> data);
// data eshte arrow function qe sherben per te marre te dhena nga serveri
  const { weather , 
  main :{temp , humidity},
wind : {speed},
sys : {country},
 name} = data;
   
    const {description, icon} = data.weather[0];
// objekte me siper sherben per te marre te dhenat deshiruar nga serveri dhe shafqim dom.
    return {

      weather,
       temp , 
        humidity,
         speed,
        country,
         name,
       description, 
       iconURL: makeIconURL(icon)
         }
}

export {getFormattedWeatherData};