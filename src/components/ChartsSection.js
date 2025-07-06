import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartsSection = ({ chartData }) => {
  const { anni, costiAcquistoAnnuali, costiAffittoAnnuali, valoreImmobileAnnuale, patrimonioNettoAnnuale } = chartData;

  const costiChartData = {
    labels: anni,
    datasets: [
      {
        label: 'Costi Acquisto',
        data: costiAcquistoAnnuali,
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Costi Affitto',
        data: costiAffittoAnnuali,
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const patrimonioChartData = {
    labels: anni,
    datasets: [
      {
        label: 'Valore Immobile',
        data: valoreImmobileAnnuale,
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Patrimonio Netto',
        data: patrimonioNettoAnnuale,
        borderColor: '#f39c12',
        backgroundColor: 'rgba(243, 156, 18, 0.1)',
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Spese Affitto Cumulative',
        data: costiAffittoAnnuali,
        borderColor: '#9b59b6',
        backgroundColor: 'rgba(155, 89, 182, 0.1)',
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '€' + value.toLocaleString('it-IT');
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Anni',
        },
      },
    },
    interaction: {
      intersect: false,
    },
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">📊 Andamento nel Tempo</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">💰 Costi Cumulativi</h4>
          <Line data={costiChartData} options={chartOptions} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">🏠 Patrimonio vs Spese</h4>
          <Line data={patrimonioChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartsSection; 