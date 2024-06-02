import React, { useState } from "react";
import "./Weather.css";

const api = {
  key: "4111c4454306d233f4979be1198d2ba7",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");
  const [weatherCondition, setWeatherCondition] = useState("");

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Location not found");
          }
          return response.json();
        })
        .then((result) => {
          setWeather(result);
          setQuery("");
          setWeatherCondition(result.weather[0].main.toLowerCase());
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month}, ${year}`;
  };

  const className =
    weatherCondition === "clear" || weatherCondition.includes("sun")
      ? "warm"
      : weatherCondition === "cloudy" || weatherCondition.includes("overcast")
      ? "cloudy"
      : weatherCondition === "rain" || weatherCondition.includes("shower")
      ? "rainy"
      : "cold";

  return (
    <div className={`app ${className}`}>
      <main>
        <div className="search-box">
          <input
            type="search"
            className="search-bar"
            value={query}
            placeholder="search"
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>

        {error ? (
          <div className="error">{error}</div>
        ) : typeof weather.main !== "undefined" ? (
          <div className="location-box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="date">{dateBuilder(new Date())}</div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather?.main.temp)}°C</div>
              <div className="weather-details">
                <div className="weather">
                  Feels like: {Math.round(weather?.main.feels_like)}°C
                </div>
                <div className="weather">
                  Wind: {Math.round(weather?.wind.speed * 3.6)} km/h
                </div>
                <div className="weather">
                  Humidity: {weather?.main.humidity}%
                </div>
              </div>
              <div className="condition">{weather?.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default Weather;
