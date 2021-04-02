import { useEffect, useState } from 'react'; 
import './App.css';
import Map from './components/Map/Map';
import { getCurrentLatLng } from './services/geolocation';

function App () {

  const [appData, setAppData] = useState({
    lat: null,
    lng: null,
    temp: null,
    icon: ''
  });

  const getAppData = async () => {
    // we need browser location 
    const {lat, lng} = await getCurrentLatLng();
    // then we set our state 
    setAppData({lat, lng});
    // we need weather data
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = '5b3c5a41e420b342a7d2e498f5e3fd82';

    const weatherData = await fetch(`${BASE_URL}?lat=${lat}&lon=${lng}&units=imperial&appid=${API_KEY}`)
      .then(res => res.json());
    
    console.log(weatherData)
    
    setAppData({
      lat, 
      lng,
      temp: Math.round(weatherData.main.temp),
      icon: weatherData.weather[0].icon,
    })
  };
    
  // set up useEffect function
  useEffect(() => {
    // Make your AJAX request here, or anything else you need on page load
    getAppData();
    console.log('useEffect was called');
  }, []); // dependency array - rerun effect function if any listed values change
  // if empty, only run effect function on initial render



  return (
    <div className='App'>
      <Map lat={appData.lat} lng={appData.lng} />
      <header className='App-header'>
        {
        appData.temp &&
          <div>
            {appData.temp}&deg;
          </div>
        }
        REACT WEATHER
        {
        appData.icon &&
          <img 
            src={`https://openweathermap.org/img/w/${appData.icon}.png`}
            alt='Current Conditions'
          />
        }
      </header>
    </div>
  );
}

export default App;
