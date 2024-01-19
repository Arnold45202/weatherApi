import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import '../src/styleSheets/weather.css'
import LiveTimeAndDate from './time';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=861f26d12f2b7531cc946bd06c048408`
      );
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="weather-container">
      <h1 className='title'>What's the weather now 🤔</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
          className="search-input"
        />
      </form>
      {weatherData ? (
        <div className="weather-details">
          <h2>{weatherData.name}</h2>
          <p><LiveTimeAndDate /></p>
          <div className="weather-info">
            <p>
              🌡️ Temperature: {weatherData.main.temp}°C
            </p>
          </div>
          <div className="weather-info">
            <p>
              🌤️ Description: {weatherData.weather[0].description}
            </p>
          </div>
          <div className="weather-info">
            <p>
              😅 Feels like: {weatherData.main.feels_like}°C
            </p>
          </div>
          <div className="weather-info">
            <p>
              💧 Humidity: {weatherData.main.humidity}%
            </p>
          </div>
          <div className="weather-info">
            <p>
              🔵 Pressure: {weatherData.main.pressure}
            </p>
          </div>
          <div className="weather-info">
            <p>
              🌬️ Wind Speed: {weatherData.wind.speed}m/s
            </p>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;