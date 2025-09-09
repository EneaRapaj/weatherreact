"# weatherreact" 

🌦 Weather Forecast React App

This is a React-based weather forecast application built with React Bootstrap.
The app allows users to search for a city, view current weather conditions, hourly forecasts, daily forecasts, UV index, sunrise/sunset times, and more.

It also includes customizable settings for temperature (°C / °F) and wind speed units (km/h / mph).

🚀 Features

🔍 City Search with autocomplete suggestions

🌍 Displays current weather observations

📅 15-day daily forecast with clickable cards

⏰ 10-day hourly forecast with expandable details

☀️ UV index visualization with dynamic SVG icons

🌅 Sunrise and Sunset times

🌬 Wind, Humidity, Pressure, and Visibility data

⚙️ Settings panel to change temperature and wind speed units

🖼 Dynamic background images that change based on weather conditions

🛠 Tech Stack

React.js (functional components + hooks)

React Bootstrap for UI components

Bootstrap for styling

Custom weather icon system (mapped to phrases/narratives)

API data exchange handled via a custom hook (DataExchange)

📂 Project Structure

src/
├── components/
│   ├── NavbarComp.js        # Navigation bar with search + logo
│   ├── LocationBox.js       # Main container with weather data
│   ├── SimpleWeather.js     # Daily forecast cards with icons
│   ├── Hourly.js            # Hourly forecast with details
│   ├── FirstContainer.js    # UV index + Sunrise/Sunset
│   ├── Result.js            # Current observations + station info
│   ├── Setting.js           # Settings for units (temp + wind)
│
├── localbox/
│   └── locationbox.js       # Local weather container
│
├── image/                   # Weather icons & logos
│   └── weather/             # Condition-specific icons
│
├── DataExchange.js          # Handles weather API requests
├── Error.js                 # Error handling component
├── App.js                   # Main application entry
└── index.css                # Global styles

⚡️ Installation & Setup
1️⃣ Clone the Repository

git clone https://github.com/enearapaj/weather-react-app.git
cd weather-react-app

npm install
npm start

The app will run on:
👉 http://localhost:3000

⚙️ Usage

Enter a city name in the search bar.

Select from the suggestions dropdown.

View:

Current temperature, wind speed, humidity, visibility, and pressure.

UV index and icons.

Sunrise and sunset times.

15-day forecast with clickable daily cards.

10-day hourly forecast with details on precipitation, pressure, and feels-like temperature.

Use the Settings panel to toggle between °C/°F and km/h/mph.

Watch the background image automatically update depending on weather conditions (sunny, cloudy, storm, fog, snow, etc.).

🎨 Component Highlight: SimpleWeather

The SimpleWeather component handles the daily weather forecast (up to 15 days).

Features:

Displays forecast cards for each day

Shows icons based on the narrative (e.g., sunny, cloudy, fog, snow)

Highlights the selected day with an active card style

Supports unit conversion for:

🌡 Temperature: Celsius ↔ Fahrenheit

🌬 Wind speed: km/h ↔ mph

Icon System:

Weather icons are chosen by matching narrative keywords against a predefined keywordsMap, e.g.:
sunny: ["sun", "clear"],
partly_cloudy: ["partly cloudy", "mostly cloudy"],
rain: ["rain", "showers", "drizzle"],

If no match is found → a “no data” icon is displayed.

🖼 Dynamic Backgrounds

In App.js, background images automatically update depending on the current weather narrative:

☀️ Sunny → bright background

🌩 Storm/Thunder → dark cloudy background

🌫 Fog → misty background

❄ Snow → winter theme

❌ No data → fallback image

This mapping is defined in bgMap and uses keywordsMap from SimpleWeather.

📸 Screenshots (example placeholders)

🔍 City Search and Suggestions

🌦 Daily Forecast Cards

⏰ Hourly Forecast with Details

☀️ UV Index + Sunrise/Sunset

⚙️ Settings Panel

🖼 Dynamic Backgrounds

![Click city name in form and appear table city name ](<Screenshot 2025-09-09 122614.png>)
![Appear weather forecast for this city ](<Screenshot 2025-09-09 122636.png>)
![Is other pieces of application](<Screenshot 2025-09-09 122657.png>)

🧩 Future Improvements

Add geolocation to detect the user’s city automatically

Dark/Light mode support

Improve error handling for invalid city searches

Multi-language support

👨‍💻 Author

- **Enea Rapaj** – [GitHub](https://github.com/enearapaj)  
- Developed with ❤️ using React & Bootstrap
Developed with ❤️ using React & Bootstrap.