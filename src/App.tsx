import React, {useState} from 'react';
import './App.css';
import {Weather} from './Weather';

function App() {
    const [city, setCity] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    console.log(city);
    const [weather, setWeather] = useState<{temp: number, description: string} | null>(null);
    console.log(weather);

    // const fetchWeather=()=>{
    //     // const city='Helsinki';
    //     const apiKey = '7499e9f0cfd6cb862a73f272fd17492b';
    //     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    //         .then(response => response.json())
    //         .then(json => console.log(json))
    // }
    const fetchWeather = () => {        
        const apiKey = '1ce2c8f1225f14bf33b893989c1548cf';         fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)            
    .then(response => response.json())            
    .then(json => {                
        if (json.cod === "404") {setError('City not found');             
        } else {                    
            setWeather({
                temp: json.main.temp,
                description: json.weather[0].description
            })
            setError(null);
        }            
    })            
            .catch(error => {                
                console.error('Ошибка:', error);                setError('An error occurred');     
            });    
        }

    return (
        <div className="App">
            <h1>Weather App</h1>
            <div>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                />
                <button onClick={fetchWeather}>Get Weather</button>
            </div>
            {weather && <Weather temp={weather.temp} description={weather.description} />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default App;