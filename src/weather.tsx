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
    } catch (error) {
      setWeatherData(null);
      setError(true);
    }
  };

  useEffect(() => {
    document.title = 'Weather App';
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;

    if (favicon) {
      favicon.href = 'data:image/jpeg;base64,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';
    }
  }, []);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="weather-container" >
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
      {error && !weatherData ? (
        <div className="weather-details">
          <h2 className='error-message'>City can't be found!!</h2>
        </div>
      ) : weatherData ? (
        <div className="weather-details">
          <h2 className='country'>{weatherData.name}</h2>
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
          <p><LiveTimeAndDate /></p>
        </div>
      ) : (
        <h2 className='loading'>Type in your city!</h2>
      )}
    </div>
  );
};

export default Weather;