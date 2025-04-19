// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 100,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(res.data);
      } catch (err) {
        console.error('Error fetching coins:', err);
      }
    };

    fetchCoins();
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <h2 className="home-title">Top 100 Cryptos</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or symbol..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="table-container">
        <table className="coin-table">
          <thead>
            <tr>
              <th>Coin</th>
              <th>Price</th>
              <th>24h %</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin) => (
              <tr key={coin.id}>
                <td>
                  <div className="coin-info">
                    <img src={coin.image} alt={coin.name} className="coin-logo" />
                    <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
                  </div>
                </td>
                <td>${coin.current_price.toLocaleString()}</td>
                <td
                  className={coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td>${coin.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
