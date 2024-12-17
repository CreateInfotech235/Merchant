import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getdata } from '../../Components_merchant/Api/Dashboard';
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderCountsChart = () => {
  const [orderCounts, setOrderCounts] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch order count data from the API with the selected dates
  const fetchOrderCounts = async () => {
    // console.log(startDate);
    // console.log(endDate);
    try {
      const res = await getdata(startDate, endDate);

      if (res && res.status) {
        setOrderCounts(res.data); // Assuming data.data contains the counts
      } else {
        console.error('Error fetching order counts:', res.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchOrderCounts();
  }, [startDate, endDate]); // Only call fetch when dates change

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);

    // If start date is selected, set the end date to the same value (if not already set)
    if (!endDate) {
      setEndDate(selectedStartDate);
    }
  };

  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;
    setEndDate(selectedEndDate);
  };

  // Ensure that end date is never earlier than start date
  useEffect(() => {
    if (endDate && new Date(endDate) < new Date(startDate)) {
      setEndDate(startDate); // Set end date to start date if it's earlier
    }
  }, [startDate, endDate]);

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

  // Get today's date and max date for the date picker
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  return (
    <div>
      <div className='flex justify-between flex-wrap'>
        <h2 className="font-bold text-[30px] mb-4 underline">Order Counts</h2>
        <div className='flex flex-wrap'>
          <div className='flex items-center ml-2 justify-between w-full md:justify-start md:w-auto' >
            <div className='mr-2 text-gray-600 font-medium'>
              Start date:
            </div>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              placeholder="Start Date"
              max={today}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
          </div>

          <div className='flex items-center mx-2 mt-[10px] md:mt-0 w-full justify-between md:justify-start md:w-auto' >
            <div className='mr-2 text-gray-600 font-medium'>
              End date:
            </div>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              placeholder="End Date"
              min={startDate}
              max={today}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
          </div>

          <div className='mx-auto mt-2 md:mt-0'>
            <div className='flex flex-wrap'>
              <div className='flex items-center'>
                <button
                  onClick={() => {
                    setStartDate(today);
                    setEndDate(today);
                  }}
                  className="bg-blue-500 text-white font-medium rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Today
                </button>
              </div>

              <div className='flex items-center ml-2'>
                <button
                  onClick={() => {
                    setStartDate('');
                    setEndDate('');
                  }}
                  className="bg-white text-gray-700 font-medium rounded-md px-4 py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

          </div>


        </div>
      </div>

      {/* Show chart if data is fetched */}
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default OrderCountsChart;
