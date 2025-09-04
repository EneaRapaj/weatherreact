import { useState } from "react";
import axios from "axios";

function DataExchange() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const submitRequest = async (query) => {
    if (!query) return;
    setIsLoading(true);
    setIsError(null);
    setWeather(null);
    setSuggestions([]);

    try {
      const resp = await axios.request({
        method: "GET",
        url: "https://weather338.p.rapidapi.com/locations/search",
        params: { query, language: "en-US" },
        headers: {
          "x-rapidapi-key": "d48ac43268mshb3d10dbc7faad26p1ae24djsn8fa1aed79f76",
          "x-rapidapi-host": "weather338.p.rapidapi.com",
        },
      });

      const loc = resp?.data?.location;
      if (!loc || !Array.isArray(loc.address) || loc.address.length === 0) {
        setIsError(`City ${query} not found`);
        return;
      }

      // Nderto listën nga arrays paralele: address, latitude, longitude, ...
      const list = loc.address.map((addr, i) => ({
        display: addr,
        lat: Number(loc.latitude?.[i]),
        lon: Number(loc.longitude?.[i]),
        city: loc.city?.[i],
        country: loc.country?.[i],
      }));

      console.log("RAW locations:", resp.data);
      console.log("Suggestions:", list);

      setSuggestions(list);
    } catch (err) {
      console.error(err);
      setIsError("Error fetching city data");
    } finally {
      setIsLoading(false);
    }
  };

 const fetchWeather = async (lat, lon) => {
  if (lat == null || lon == null) return null;

  try {
    const resp = await axios.request({
      method: "GET",
      url: "https://weather338.p.rapidapi.com/weather/forecast",
      params: {
        date: "20200622", // mund ta ndryshosh në datën e sotme
        language: "en-US",
        latitude: lat,
        longitude: lon,
        units: "m",
      },
      headers: {
        "x-rapidapi-key": "d48ac43268mshb3d10dbc7faad26p1ae24djsn8fa1aed79f76",
        "x-rapidapi-host": "weather338.p.rapidapi.com",
      },
    });

    console.log("RAW Weather JSON:", resp.data); // ✅ shto console.log për të parë JSON-in

    setWeather(resp.data); // ruan weather brenda hook
    return resp.data;       // kthen të dhënat jashtë hook
  } catch (err) {
    console.error("FetchWeather error:", err.response?.data || err.message);
    setIsError("Error fetching weather data");
    return null;
  }
};


  // 🔹 Ekspozo një util për të mbyllur dropdown-in pa përdorur direkt setter-in nga jashtë
  const clearSuggestions = () => setSuggestions([]);

  return {
    isLoading,
    isError,
    weather,
    suggestions,
    submitRequest,
    fetchWeather,
    clearSuggestions,
  };
}

export default DataExchange;
