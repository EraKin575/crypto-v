import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

import axios from 'axios';

const PriceChart = () => {
  const timePeriods = ['1h', '3h', '12h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];
  const [timePeriod, setTimePeriod] = useState('7d');
  const [coinPriceHistory, setCoinHistory] = useState([]);

  const params = {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    timePeriod: timePeriod
  };

  const headers = {
    'X-RapidAPI-Key': 'a67bb7208amshc9f3583b2bf2877p159913jsn086a6691f0d5',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  };

  useEffect(() => {
    async function getCoinHistory() {
      try {
        const response = await axios.get('https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history', {
          headers: headers,
          params: params
        });
        setCoinHistory(response.data.history);
      } catch (error) {
        console.error('Error fetching coin history:', error);
      }
    }

    getCoinHistory();
  }, [timePeriod]);

  const timeSelector = timePeriods.map((timePeriod) => (
    <p1
      key={timePeriod}
      onClick={() => setTimePeriod(timePeriod)}
      className="cursor-pointer w-[40px]  text-lg mx-[5px] text-center font-bold rounded-lg hover:bg-blue-300 text-gray-500 hover:text-blue-600"
    >
      {timePeriod}
    </p1>
  ));

  const [coinData, setCoinData] = useState({
    coinPrice: [],
    coinTimeStamp: []
  });

  useEffect(() => {
    const coinPriceData = [];
    const coinTimestampData = [];
    for (let i = 0; i < coinPriceHistory.length; i += 1) {
      coinPriceData.push(coinPriceHistory[i].price);
      coinTimestampData.push(new Date(coinPriceHistory[i].timestamp).toLocaleDateString());
    }
    setCoinData({
      coinPrice: coinPriceData,
      coinTimeStamp: coinTimestampData,
    });
  }, [coinPriceHistory]);

  const chartData = {
    labels: coinData.coinTimeStamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinData.coinPrice,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  return (
    <div>
      <h1>Price Chart</h1>
      <div className="flex bg-gray-200 w-min rounded-md">
        {timeSelector}
      </div>
      <Line data={chartData} />
    </div>
  );
}

export default PriceChart;

