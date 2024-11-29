import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Barchart = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: 'Accepted Order',
        data: data.map(item => item.accepted),
        backgroundColor: 'rgba(0, 123, 255, 1)', 
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1,
        barThickness: 4, 
      },
      {
        label: 'Cancelled Order',
        data: data.map(item => item.cancelled),
        backgroundColor: 'rgba(255, 99, 132, 1)', 
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        barThickness: 4, 
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false, 
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
    <div className="bar-charts w-100" style={{ height: '700px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Barchart;