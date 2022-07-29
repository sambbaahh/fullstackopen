import axios from 'axios'
import { useState, useEffect } from 'react';

const Weather = ({ capital }) => {
    const api_key = process.env.REACT_APP_NOT_SECRET_CODE
    const [weather, setWeather] = useState([])

    useEffect(() => {
        axios
            .get('https://api.openweathermap.org/data/2.5/weather?q=' + capital + '&appid=' + api_key + '&units=metric')
            .then(response => {
                setWeather(response.data)
            })
    }, [])

    if (weather.length != 0) {
        const id = weather.weather.map(id =>
            id.icon)
        const iconLink = 'http://openweathermap.org/img/wn/' + id + '@2x.png'
        return (
            <div>
                <h2> Weather in {capital}</h2>
                <p> temperature {weather.main.temp} Celcius</p>
                <img src={iconLink} />
                <p>wind {weather.wind.speed} m/s</p>

            </div>
        )
    }
}

export default Weather