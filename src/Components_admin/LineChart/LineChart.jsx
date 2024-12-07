import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './LineChart.css';

// Register the necessary components including PointElement
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
    // Sample data for the chart
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Cancelled',
            data: [300, 600, 900, 1200, 0, 0, 0, 0, 0, 0, 0, 0], // Ensure 12 data points
            fill: false,
            borderColor: 'rgba(45, 156, 219, 1)',
            borderWidth: 1, // Increase the borderWidth for better visibility
            pointRadius: 0, // Set pointRadius to 0 to remove the points
        }, {
            label: 'Complete',
            data: [400, 700, 1000, 1300, 0, 0, 0, 0, 0, 0, 0, 0], // Ensure 12 data points
            fill: false,
            borderColor: 'rgba(255, 91, 91, 1)', // Different color for the second line
            borderWidth: 2, // Increase the borderWidth for better visibility
            pointRadius: 0, // Set pointRadius to 0 to remove the points
        }]
    };

    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                type: 'category',
                grid: {
                    display: false, // Remove x-axis grid lines
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false, // Remove y-axis grid lines
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
        <div className="payment-count-graph w-100">
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
