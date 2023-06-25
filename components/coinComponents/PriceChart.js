import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-moment';
import moment from 'moment';
ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
        setCoinHistory(response.data);
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
      className={`cursor-pointer w-[40px] text-md ${timePeriod!='5y' && `border-r-[0.5px]`} border-solid border-gray-500 text-center font-bold hover:bg-blue-300 ${
        global.timePeriod === timePeriod ? 'text-blue-600' : 'text-gray-500'
      }`}
    >
      {timePeriod}
    </p1>
  ));

  let coinPrice = [];
  let coinTimestamp = [];
  for (let i = 0; i < coinPriceHistory?.data?.history?.length; i++) {
    coinPrice.push(coinPriceHistory?.data?.history[i]?.price);
    coinTimestamp.push(moment(coinPriceHistory?.data?.history[i]?.timestamp * 1000));
  }

  const getTimeUnit = (timePeriod) => {
    if (timePeriod === '1h') {
      return 'hour';
    } else if (timePeriod === '3h') {
      return 'hour';
    } else if (timePeriod === '12h') {
      return 'hour';
    } else if (timePeriod === '24h') {
      return 'hour';
    } else if (timePeriod === '7d') {
      return 'day';
    } else if (timePeriod === '30d') {
      return 'day';
    } else if (timePeriod === '3m') {
      return 'month';
    } else if (timePeriod === '1y') {
      return 'year';
    } else if (timePeriod === '3y') {
      return 'year';
    } else if (timePeriod === '5y') {
      return 'year';
    } else {
      return 'day';
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: getTimeUnit(timePeriod),
        },
        ticks: {
          source: 'auto',
        },
      },
    },
  };

  const chartContainerStyle = {
    width: '800px',
    height: '600px',
  };

  const chartData = {
    labels: coinTimestamp,
    datasets: [
      {
        radius: 0,
        label: 'Price In USD',
        data: coinPrice,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <h1>Price Chart</h1>
      <div className="flex bg-gray-200 rounded-lg w-min">{timeSelector}</div>
      <div style={chartContainerStyle}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PriceChart;
