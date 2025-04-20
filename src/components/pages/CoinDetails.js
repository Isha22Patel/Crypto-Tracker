// src/components/pages/CoinDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CoinDetails = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState([]);
  const [coinInfo, setCoinInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const priceRes = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
          {
            params: {
              vs_currency: 'usd',
              days: '7',
            },
          }
        );

        const infoRes = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setCoinData(priceRes.data.prices);
        setCoinInfo(infoRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const chartData = {
    labels: coinData.map((item) => {
      const date = new Date(item[0]);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    datasets: [
      {
        label: 'Price in USD',
        data: coinData.map((item) => item[1]),
        fill: true,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      {loading ? (
        <p>Loading coin details...</p>
      ) : (
        <>
            <h2>
            <img src={coinInfo.image.small} alt={coinInfo.name} style={{ verticalAlign: 'middle', marginRight: 10 }} />
            {coinInfo.name} ({coinInfo.symbol.toUpperCase()})
            </h2>
          <p style={{ marginBottom: '10px' }}>
            Current Price: ${coinInfo.market_data.current_price.usd.toLocaleString()} | Rank: #{coinInfo.market_cap_rank}
          </p>
          <div style={{ width: '100%', height: '400px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </>
      )}
    </div>
  );
};

export default CoinDetails;
