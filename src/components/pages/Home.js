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
        console.error("Error fetching coins:", err);
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Top 100 Cryptos</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by name or symbol..."
        className="mb-4 p-2 w-full max-w-md border rounded shadow-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Coin</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">24h %</th>
              <th className="py-2 px-4">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin) => (
              <tr key={coin.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 flex items-center gap-2">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                  {coin.name} <span className="text-sm text-gray-500">({coin.symbol.toUpperCase()})</span>
                </td>
                <td className="py-2 px-4">${coin.current_price.toLocaleString()}</td>
                <td
                  className={`py-2 px-4 ${
                    coin.price_change_percentage_24h >= 0
                      ? 'text-green-600'
                      : 'text-red-500'
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="py-2 px-4">${coin.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
