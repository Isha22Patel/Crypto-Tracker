import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = ({search}) => {
  const [coins, setCoins] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 100,
            page: 1,
            sparkline: false,
          },
        })
        setCoins(res.data);
      } catch (error) {
        console.error('Error fetching coins:', error)
      }
    }

    fetchCoins()
  }, [])

  const handleCoinClick = (coinId) => {
    navigate(`/coin/${coinId}`)
  }

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ padding: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Coin</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Price</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>24h %</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Market Cap</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Graph</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map((coin) => (
            <tr key={coin.id}>
              <td style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
                <img
                  src={coin.image}
                  alt={coin.name}
                  width="20"
                  height="20"
                  style={{ marginRight: '10px' }}
                />
                {coin.name}
              </td>
              <td style={{ padding: '10px' }}>${coin.current_price.toLocaleString()}</td>
              <td
                style={{
                  padding: '10px',
                  color: coin.price_change_percentage_24h >= 0 ? 'green' : 'red',
                }}
              >
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </td>
              <td style={{ padding: '10px' }}>${coin.market_cap.toLocaleString()}</td>
              <td style={{ padding: '10px' }}>
                <button
                  onClick={() => handleCoinClick(coin.id)}
                  className='view-graph-btn'
                >
                  View Graph
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home
