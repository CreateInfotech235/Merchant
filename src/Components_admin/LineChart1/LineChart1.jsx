import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './LineChart1.css';

// Register the necessary components including PointElement
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart1 = () => {
    // Sample data for the chart
    const data = {
        labels: ['Jan 26', 'Feb 26', 'Mar 26', 'Apr 26', 'May 26', 'Jun 26', 'Jul 26', 'Aug 26', 'Sep 26'],
        datasets: [{
            label: 'cancelled',
            data: [0, 2, 4, 8],
            fill: false,
            borderColor: '#2D9CDB',
            borderWidth: 3,
            pointRadius: 0,
        }]
    };

    // Chart options
    const options = {
        animation: {
            duration: 1000, // Animation duration in milliseconds
            easing: 'easeInOutQuad', // Animation easing function
        },
        scales: {
            x: {
                type: 'category',
                beginAtZero: true,
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'Monthly Payment Count',
                font: {
                    size: 20,
                },
                align: 'start', // Align the title to the start (left)
                position: 'top', // Position the title at the top
            },
        },
    };

    return (
        <div className="chart">
            <Line data={data} options={options} width={1000} height={200} /> {/* Set width and height here */}
        </div>
    );
};

export default LineChart1;
