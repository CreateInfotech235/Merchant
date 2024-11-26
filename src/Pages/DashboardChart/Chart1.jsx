// OrderCountsChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getCounts } from '../../Components/Api/Dashboard';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderCountsChart = () => {
  const [orderCounts, setOrderCounts] = useState(null);

  // Fetch order count data from the API
  useEffect(() => {
    const fetchOrderCounts = async () => {
      try {
        const res = await getCounts();
        if (res) {
          setOrderCounts(res.data); // Assuming data.data contains the counts
        } else {
          console.error('Error fetching order counts:', data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOrderCounts();
  }, []);

  if (!orderCounts) {
    return <p>Loading...</p>; // Show loading state while data is being fetched
  }

  // Chart.js Data Format
  const chartData = {
    labels: [
      'Total Orders', 'Created', 'Assigned', 'Accepted', 'Arrived', 
      'Picked Up', 'Departed', 'Delivered', 'Cancelled', 'Delivery Men'
    ],
    datasets: [
      {
        label: 'Order Counts',
        data: [
          orderCounts.totalOrders,
          orderCounts.createdOrders,
          orderCounts.assignedOrders,
          orderCounts.acceptedOrders,
          orderCounts.arrivedOrders,
          orderCounts.pickedOrders,
          orderCounts.departedOrders,
          orderCounts.deliveredOrders,
          orderCounts.cancelledOrders,
          orderCounts.deliveryMan
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Chart.js options
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <h2>Order Counts</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default OrderCountsChart;
