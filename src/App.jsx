import React, { useState, useEffect } from 'react';
import './App.css';
import Temperature from './components/Temperature';
import Highlights from './components/Highlights';

function App() {
  const [city, setCity] = useState('Mumbai');
  const [weatherData, setweatherData] = useState('null');
  // always call API inside Use effect
  // weatherData is the fetched data

  useEffect(() => {
    const ApiURL = `https://api.weatherapi.com/v1/current.json?key=cee3700c835849e0b1d223248241202&q=${city}&aqi=no;`;
    fetch(ApiURL)
      // response is int the form of stream of data
      .then((response) => {
        if (!response.ok) {
          throw new Error("Couldn't get data");
        }
        return response.json(); // converting into json if no error given
      })
      .then((data) => {
        console.log(data);
        setweatherData(data); // json data
      })
      .catch((e) => {
        console.log(e);
      })
  }, [city]); // when city changes, we call api
 
  
  // justify-content: longer word: horizontal alignment
  // align - items: shorter word: vertical alignment
  return (
    <div className='bg-[#1F213A] h-screen flex justify-center align-top'>
    
      {/* // 1/5 width of the available width */}

      <div className='mt-40 w-1/5 h-1/3' >
        {/* only when weatherdata fetched */}
        {weatherData && (
          <Temperature
            setCity={setCity}
            stats={{
              temp: weatherData.current?.temp_c,
              condition: weatherData.current?.condition.text,
              isDay: weatherData.current?.is_day,
              location: weatherData.location?.name,
              time: weatherData.location?.localtime,
            }}
          />
        )}
          
      </div> 
      <div className='mt-40 w-1/3 h-1/3 p-10 grid grid-cols-2 gap-6'>
        <h2 className='text-slate-200 text-2xl col-span-2'>Today's Highlights</h2>
        {/* gives our heading the span of two coloumns complete */}
        {weatherData &&
        (
          <>
            <Highlights stats={{
              title: "Wind Status",
              value: weatherData.current?.wind_mph,
              unit: "mph",
              direction: weatherData.current?.wind_dir, 
            }}
            />
            <Highlights stats={{
              title: "Humidity",
              value: weatherData.current?.humidity,
              unit: "%",
            }}
            />
            <Highlights stats={{
              title: "Visibility",
              value: weatherData.current?.vis_miles,
              unit: "miles",
            }} />
            <Highlights stats={{
              title: "Air Pressure",
              value: weatherData.current?.pressure_mb,
              unit: "mb",
            }} />
          </>
        )
          
        }
        
      </div>
    </div>
    
  )
}

export default App
