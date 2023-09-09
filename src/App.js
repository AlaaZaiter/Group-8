import React, { useState } from "react";
import './style.css'; // Import your CSS file here
import sunnyImage from "./Sun.svg";
import rainyImage from "./rain.svg";
import DrizzleImage from "./drizzle.svg";
import SnowImage from "./snow.svg";
import FogImage from "./fog.svg";
import unknownImage from "./unknown.svg";

import cloudyImage from "./mostlycloudy.svg";
import mostlyCloudyImage from "./mostlycloudy.svg";
import partlyCloudyImage from "./partlycloudy.svg";
import stormImg from "./storm.svg"
const api = {
  key: "a54bcb31856ef7fdd5951b25d149b4b9",
  base: "https://api.openweathermap.org/data/2.5/",
  forecast: "forecast",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const getLocalDay = (utcTimestamp) => {
    const localDate = new Date(utcTimestamp * 1000);
    return localDate.toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  const getCurrentDayForecast = () => {
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "short",
    });
    const currentDayForecast = weather.list && weather.list.find((forecast) => getLocalDay(forecast.dt) === today);
    return currentDayForecast;
  };

  const searchPressed = () => {
    if (search) {
      fetch(`${api.base}${api.forecast}?q=${search}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
        });
    }
  };
  const WeatherImageSuitable = (weatherId) => {
    switch (weatherId) {
      case 200:
      case 201:
      case 202:
      case 210:
      case 211:
      case 212:
      case 221:
      case 230:
      case 231:
      case 232:
        return stormImg; // Thunderstorm
  
      case 300:
      case 301:
      case 302:
      case 310:
      case 311:
      case 312:
      case 313:
      case 314:
      case 321:
        return DrizzleImage; // Drizzle
  
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
      case 511:
      case 520:
      case 521:
      case 522:
      case 531:
        return rainyImage; // Rain
  
      case 600:
      case 601:
      case 602:
      case 611:
      case 612:
      case 613:
      case 615:
      case 616:
      case 620:
      case 621:
      case 622:
        return SnowImage; // Snow
  
      case 701:
      case 711:
      case 721:
      case 731:
      case 741:
      case 751:
      case 761:
      case 762:
      case 771:
      case 781:
        return FogImage; // Mist/Fog
  
      case 800:
        return sunnyImage; // Clear sky
  
      case 801:
      case 802:
      case 803:
      case 804:
        return cloudyImage; // Clouds
  
      default:
        return unknownImage; // Default icon for unknown/weather not specified
    }
  };
  
  
  

  return (
    <div>
      <header>
        <div className="background-element">
          <div className="SearchingDiv">
            <h1 className="title">Find weather Forecast</h1>
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Enter city/town..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="search-button" onClick={searchPressed}>
                <i className="search-icon">&#128269;</i>
              </button>
            </div>
          </div>
        </div>
      </header>
     
      <div className="weatherDataContainer">
        <div>
          <section>
            <p className="pays">{weather.city ? weather.city.name : ""}</p>
          </section>
        </div>
        <div>
          <p className="adate">
            {weather.list && weather.list.length > 0
              ? getLocalDay(getCurrentDayForecast().dt)
              : ""}<br />
            {weather.list && weather.list.length > 0
              ? `${Math.round(getCurrentDayForecast().main.temp)}°C`
              : ""}
          </p>
          <p className="adeg">{weather.list && weather.list.length > 0 ? `${Math.round(getCurrentDayForecast().main.temp)}°C` : ""}</p>
<img
  src={WeatherImageSuitable(weather.list && weather.list.length > 0 ? getCurrentDayForecast().weather[0].id : "")}
  alt={weather.list && weather.list.length > 0 ? getCurrentDayForecast().weather[0].id: ""}
  className="WeatherIcon" />
</div>
      </div>
      <div className="scroll-container">
        <table>
          <tbody>
            <tr>
              {/* Display weather data here */}
              {weather.list && weather.list.length > 0
                ? weather.list.slice(0, 7).map((forecast, index) => (
                    <th key={index}>
                      <p>
                        {new Date(forecast.dt * 1000).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                      <img
  src={WeatherImageSuitable(weather.list && weather.list.length > 0 ? getCurrentDayForecast().weather[0].id : "")}
  alt={weather.list && weather.list.length > 0 ? getCurrentDayForecast().weather[0].id: ""}
   />
                      <p>{Math.round(forecast.main.temp)}°C</p>
                    </th>
                  ))
                : "" }
            </tr>
          </tbody>
        </table>
      </div>
      <footer className="footer">
        <p>&copy; 2023 Find weather Forecast. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
