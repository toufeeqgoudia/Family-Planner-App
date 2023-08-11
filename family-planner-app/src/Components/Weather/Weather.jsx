import { useState } from "react";
import TextField from "@mui/material/TextField";
import sunny from "../../Images/weather/sunny.jpg"
import cloudy from "../../Images/weather/cloudy.jpg"
import rainy from "../../Images/weather/rainy.jpg"

const base = import.meta.env.VITE_WEATHER_URL
const key = import.meta.env.VITE_WEATHER_KEY

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      fetch(`${base}weather?q=${query}&units=metric&APPID=${key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };

  const dateToday = (d) => {
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

    return `${day}, ${date} ${month} ${year}`;
  };

  let weatherBG;

  if (weather.weather && typeof weather.main !== "undefined") {
    if (weather.weather[0].main.includes("Clear")) {
      weatherBG = sunny;
    } else if (weather.weather[0].main.includes("Clouds")) {
      weatherBG = cloudy;
    } else if (weather.weather[0].main.includes("Rain")) {
      weatherBG = rainy;
    }
  }

  return (
    <div className="mt-20 mb-10 flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold text-center">Weather</h2>

      <div className="mt-5 flex w-4/5 max-w-2xl justify-center items-center">
        <TextField
          type="text"
          label="Search City"
          autoComplete="off"
          sx={{ width: "80%" }}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyDown={handleSearch}
        />
      </div>

      {typeof weather.main !== "undefined" ? (
        <div className="mt-10 w-4/5 max-w-2xl flex flex-col justify-center items-center">
            <div
                style={{ backgroundImage: `url(${weatherBG})` }}
                className="w-full h-full pb-5 rounded-2xl bg-center bg-cover duration-500 flex flex-col justify-center items-center"
            >
            <h3 className="mt-5 text-2xl font-bold">
              {weather.name}, {weather.sys.country}
            </h3>
            <p className="mt-5 text-lg font-semibold italic">
              {dateToday(new Date())}
            </p>
            <div className="my-10 w-48 h-28 flex justify-center items-center bg-black bg-opacity-30 rounded-lg">
              <p className="text-5xl font-extrabold">
                {Math.round(weather.main.temp)}°C
              </p>
            </div>
            <p className="text-3xl font-bold">
              {weather.weather[0].description}
            </p>
        </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Weather;
