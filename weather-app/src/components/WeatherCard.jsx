import React from 'react'

const WeatherCard = ({ data }) => {
  return (
    <div style={styles.card}>
      <h2>Next 12 Hours Forecast</h2>
      <ul style={styles.list}>
        {data.map((item, idx) => (
          <li key={idx} style={styles.item}>
            <strong>{new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>: {item.temp}°C
          </li>
        ))}
      </ul>
    </div>
  )
}

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '1rem',
    marginTop: '1rem',
    maxWidth: '400px',
    margin: '0 auto',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  item: {
    padding: '0.5rem 0',
    borderBottom: '1px solid #eee'
  }
}

export default WeatherCard
