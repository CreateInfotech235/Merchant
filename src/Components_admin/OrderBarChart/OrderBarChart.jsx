// src/OrderBarChart.js
import React from 'react';
import './OrderBarChart.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const OrderBarChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: 'Accepted Order',
        data: data.map(item => item.accepted),
        backgroundColor: 'rgba(0, 123, 255, 1)',  // Solid blue color
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1,
        barThickness: 4,  // Set bar height to 4px
      },
      {
        label: 'Cancelled Order',
        data: data.map(item => item.cancelled),
        backgroundColor: 'rgba(255, 99, 132, 1)',  // Solid red color
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        barThickness: 4,  // Set bar height to 4px
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,  // Disable aspect ratio to use custom height and width
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Order Count',
      },
    },
  };

  return (
    <div className="bar-charts w-100" style={{height:'700px'}}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default OrderBarChart;
