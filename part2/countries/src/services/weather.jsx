import { useState, useEffect } from 'react';
import axios from 'axios';
const api_key = import.meta.env.VITE_SOME_KEY;

const WeatherApp = ({ lat, lon }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;

    axios.get(url)
      .then(response => {
          const weatherData = response.data.current;
          setWeather({
              temp: weatherData.temp - 273.15,
              icon: weatherData.weather[0].icon,
              wind_speed: weatherData.wind_speed
            });
      })
      .catch(error => {
        console.error('Error al obtener los datos del clima:', error);
      });
  }, [lat, lon]);
  return (
    <div>
      {weather && (
        <div>
          <p>temperature {weather.temp.toFixed(2)}°C</p>
          <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="Icono del clima" />
          <p>wind: {weather.wind_speed.toFixed(2)} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
