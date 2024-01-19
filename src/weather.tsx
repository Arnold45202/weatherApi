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

const getWeatherEmoji = (description: string): string => {
  switch (description.toLowerCase()) {
    case 'clear sky':
      return '☀️';
    case 'few clouds':
    case 'scattered clouds':
    case 'broken clouds':
      return '🌥️';
    case 'overcast clouds':
      return '☁️';
    case 'mist':
    case 'fog':
    case 'smoke':
    case 'haze':
    case 'dust':
    case 'sand':
    case 'ash':
      return '🌫️';
    case 'squalls':
    case 'tornado':
      return '🌪️';
    case 'thunderstorm with light rain':
    case 'thunderstorm with rain':
    case 'thunderstorm with heavy rain':
    case 'light thunderstorm':
    case 'thunderstorm':
    case 'heavy thunderstorm':
    case 'ragged thunderstorm':
    case 'thunderstorm with light drizzle':
    case 'thunderstorm with drizzle':
    case 'thunderstorm with heavy drizzle':
      return '⛈️';
    default:
      return '❓';
  }
};

const getHumidityEmoji = (humidity: number): string => {
  if (humidity >= 0 && humidity <= 30) {
    return '💧'; // Low humidity emoji
  } else if (humidity > 30 && humidity <= 70) {
    return '💦'; // Moderate humidity emoji
  } else {
    return '🌊'; // High humidity emoji
  }
};

const getTemperatureEmoji = (temp: number): string => {
  if (temp < 0) {
    return '❄️'; // Cold emoji
  } else if (temp >= 0 && temp <= 20) {
    return '🌡️'; // Moderate temperature emoji
  } else {
    return '☀️'; // Hot emoji
  }
};

const getPressureEmoji = (pressure: number): string => {
  if (pressure <= 1000) {
    return '🌀'; // Low pressure emoji
  } else if (pressure > 1000 && pressure <= 1015) {
    return '🌐'; // Moderate pressure emoji
  } else {
    return '🌪️'; // High pressure emoji
  }
};

const getWindSpeedEmoji = (windSpeed: number): string => {
  if (windSpeed < 5) {
    return '🍃'; // Low wind speed emoji
  } else if (windSpeed >= 5 && windSpeed <= 10) {
    return '🌬️'; // Moderate wind speed emoji
  } else {
    return '🌪️'; // High wind speed emoji
  }
};

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=861f26d12f2b7531cc946bd06c048408`
      );

      setWeatherData(response.data);
      setError(false);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setWeatherData(null);
      setError(true);
    }
  };

  useEffect(() => {
    // Comment out the fetchData() here if you don't want to make an API call on the initial render
    // fetchData();
  }, []); // Remove the fetchData dependency if you don't want it to run on every city change

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
          placeholder={error ? "City not found" : "Enter city name"}
          value={city}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
          className="search-input"
        />
      </form>
      {error && !weatherData ? (
        <div className="weather-details">
          <h2 className='error-message'>City can't be found!!</h2>
        </div>
      ) : weatherData ? (
        <div className="weather-details">
          <h2>{weatherData.name}</h2>
          <p><LiveTimeAndDate /></p>
          <div className="weather-info">
            <p>
              {getTemperatureEmoji(weatherData.main.temp)} Temperature: {weatherData.main.temp}°C
            </p>
          </div>
          <div className="weather-info">
            <p>
              {getWeatherEmoji(weatherData.weather[0].description)} Description: {weatherData.weather[0].description}
            </p>
          </div>
          <div className="weather-info">
            <p>
              😅 Feels like: {weatherData.main.feels_like}°C
            </p>
          </div>
          <div className="weather-info">
            <p>
              {getHumidityEmoji(weatherData.main.humidity)} Humidity: {weatherData.main.humidity}%
            </p>
          </div>
          <div className="weather-info">
            <p>
              {getPressureEmoji(weatherData.main.pressure)} Pressure: {weatherData.main.pressure}
            </p>
          </div>
          <div className="weather-info">
            <p>
              🌬️ Wind Speed: {weatherData.wind.speed}m/s
            </p>
          </div>
        </div>
      ) : (
        <h2 className='loading'>Type in your city!</h2>
      )}
    </div>
  );
};

export default Weather;