// DoughnutChart.js
import React from 'react';
import './DoughnutChart.css'
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title, // Import Title from Chart.js
} from 'chart.js';

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = () => {
  const data = {
    labels: ['On Time', 'In Progress', 'Delayed'],
    datasets: [
      {
        label: 'Project Status',
        data: [25, 38, 25],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        hoverBackgroundColor: ['#66BB6A', '#FFD54F', '#E57373'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        enabled: true,
      },
      title: {
        display: true,
        text: '  Project Status', // Title text
        align: 'start', // Align the title to the start (left)
        // Position the title at the left side
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <div className="doughnut w-100 " style={{height:"16.5rem"}}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
