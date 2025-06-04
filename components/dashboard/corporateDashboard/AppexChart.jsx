'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ReactApexChart with SSR disabled
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
	ssr: false,
});

const AppexChart = () => {
	const [isClient, setIsClient] = useState(false);

	// Ensure the component is only rendered on the client-side
	useEffect(() => {
		setIsClient(true);
	}, []);

	const series = [
		{
			name: 'Data',
			data: [15, 60, 40, 60], // Adjust values based on your dataset
		},
	];

	const options = {
		chart: {
			type: 'bar',
			toolbar: { show: false }, // Hide toolbar for a clean design
		},
		plotOptions: {
			bar: {
				borderRadius: 8, // Rounded bars
				columnWidth: '70%', // Adjust width of bars
			},
		},
		dataLabels: {
			enabled: true,
			formatter: (val) => val,
			style: {
				fontSize: '12px',
				colors: ['#fff'],
			},
		},
		xaxis: {
			categories: ['5 Avq', '11 Avq', '18 Avq', '24 Avq'],
			labels: { style: { colors: '#9CA3AF', fontSize: '14px' } }, // Light gray labels
			axisBorder: { show: false },
			axisTicks: { show: false },
		},
		yaxis: {
			labels: {
				style: { colors: '#000', fontSize: '16px', fontWeight: 'bold' }, // Black Y-axis labels
			},
		},
		grid: {
			borderColor: '#E5E7EB', // Light gray grid
			strokeDashArray: 5, // Dashed grid lines
		},
		colors: ['#213E82', '#1E3A8A', '#9CA3AF', '#1E3A8A'], // Match bar colors
		tooltip: { enabled: false }, // Hide tooltips for a clean UI
	};

	return (
		<div className='bg-[#E9ECF3] rounded-xl shadow-md w-full mx-auto'>
			{isClient && (
				<ReactApexChart
					options={options}
					series={series}
					type='bar'
					height={250}
				/>
			)}
		</div>
	);
};

export default AppexChart;
