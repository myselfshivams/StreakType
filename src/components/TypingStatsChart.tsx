// components/TypingStatsChart.tsx
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import React from 'react';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface TypingStatsChartProps {
  wpmData: number[];
  accuracyData: number[];
  timeLabels: string[];
}

const TypingStatsChart: React.FC<TypingStatsChartProps> = ({ wpmData, accuracyData, timeLabels }) => {
  const data = {
    labels: timeLabels,
    datasets: [
      {
        label: 'WPM',
        data: wpmData,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        fill: true,
      },
      {
        label: 'Accuracy',
        data: accuracyData,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        fill: true,
      }
    ],
  };

  return <Line data={data} />;
};

export default TypingStatsChart;
