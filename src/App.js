import warmBg from './assets/sunny.jpg'
import coldBg from './assets/cold.jpg'
import Description from './components/Descriptions';
import { useEffect, useState } from 'react';
import { getFormatedWeatherData } from './WeatherService';

function App() {
  const [city, setCity] = useState("Paris")
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('imperial');
  const [bg, setBg] = useState(warmBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormatedWeatherData(city, units);
      setWeather(data);

      const threshold = units === 'metric' ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg)
      else setBg(warmBg)
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? 'metric' : 'imperial');
  }

  const enterKeyPress = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }

  return (
    <div className="App" style={{ backgroundImage: `url(${bg}` }}>
      <div className="overlay">
        {
          weather && (
            <div className="container">
            <div className="section section__inputs">
                <input onKeyDown={enterKeyPress} type='text' name='city' placeholder='Enter City...' />
                <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="wheatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>
              
            {/* bottom description */}
            <Description weather={weather} units={units} />
    
        </div>
        )
      }
    </div>
  </div>
  );
}

export default App;