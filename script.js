import logo from './logo.svg';
import './App.css';
import { useState } from "react";

const api = {
  key: "a54bcb31856ef7fdd5951b25d149b4b9", 
  base: "https://api.openweathermap.org/data/2.5/",
  forecast: "forecast",
  
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  /*
    Search button is pressed. Make a fetch call to the Open Weather Map API.
  */
    const searchPressed = () => {
      fetch(`${api.base}${api.forecast}?q=${search}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
        });
      console.log(search);
    };
    

  return (
    <div className="App">
      <header className="App-header">
        {/* HEADER  */}
        <h1>Weather App</h1>

        {/* Search Box - Input + Button  */}
        <div>
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {/* If weather is not undefined display results from API */}
        {weather.list && weather.list.length > 0 ? (
  <div>
    {/* Location */}
    <p>{weather.city.name}, {weather.city.country}</p>

    {/* 5-day forecast */}
    {weather.list.map((forecast, index) => (
      <div key={index}>
        {/* Date and time */}
        <p>{forecast.dt_txt}</p>

        {/* Temperature Celsius */}
        <p>{forecast.main.temp}°C</p>

        {/* Condition (Sunny) */}
        <p>{forecast.weather[0].main}</p>
        <p>({forecast.weather[0].description})</p>
      </div>
    ))}
  </div>
) : (
  ""
)}

      </header>
    </div>
  );
}

export default App;
