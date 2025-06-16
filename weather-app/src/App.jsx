import React, { useState } from 'react'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'

const App = () => {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [hourlyTemps, setHourlyTemps] = useState([])
  const [error, setError] = useState('')

  const fetchWeather = async () => {
    try {
      setError('')
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
      const response = await axios.get(url)
      const temps = response.data.hourly.temperature_2m.slice(0, 12) // show first 12 hours
      const times = response.data.hourly.time.slice(0, 12)
      const weatherData = times.map((time, idx) => ({
        time,
        temp: temps[idx]
      }))
      setHourlyTemps(weatherData)
    } catch (err) {
      setError('Failed to fetch weather data')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (latitude && longitude) fetchWeather()
    else setError('Please enter both latitude and longitude')
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌦 Open-Meteo Weather App</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Get Weather</button>
      </form>

      {error && <p style={styles.error}>{error}</p>}
      {hourlyTemps.length > 0 && <WeatherCard data={hourlyTemps} />}
    </div>
  )
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem'
  },
  form: {
    marginBottom: '1rem'
  },
  input: {
    padding: '0.5rem',
    margin: '0 0.5rem',
    width: '150px'
  },
  button: {
    padding: '0.5rem 1rem'
  },
  error: {
    color: 'red'
  }
}

export default App
