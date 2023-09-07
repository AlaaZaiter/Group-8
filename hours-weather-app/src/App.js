import React, { useState } from "react";
import './style.css'; // Import your CSS file here

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
      <div className="daysTempureture">
        {/* Display weather data here */}
        {weather.list && weather.list.length > 0
          ? weather.list.slice(0, 7).map((forecast, index) => (
              <div key={index}>
                <h6 className="dys">
                  {getLocalDay(forecast.dt)}
                  <br />
                  {Math.round(forecast.main.temp)}°C
                </h6>
              </div>
            ))
          : ""}
      </div>
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
          {/* Add the "adeg" CSS class here */}
          <p className="adeg">{weather.list && weather.list.length > 0 ? `${Math.round(getCurrentDayForecast().main.temp)}°C` : ""}</p>
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
                      <p>{Math.round(forecast.main.temp)}°C</p>
                    </th>
                  ))
                : ""}
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
