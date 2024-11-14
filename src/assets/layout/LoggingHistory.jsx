import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LoggingHistory = () => {
  const [recentLogs, setRecentLogs] = useState([]);
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    // Fetch recent logs and trend data from local storage or API
    const storedLogs = JSON.parse(localStorage.getItem('symptomLogs')) || [];
    setRecentLogs(storedLogs.slice(-5)); // Display last 5 entries

    // Prepare trend data for the chart
    const dates = storedLogs.map(log => log.date);
    const severities = storedLogs.map(log => log.severity);

    setTrendData({
      labels: dates,
      datasets: [
        {
          label: 'Symptom Severity Over Time',
          data: severities,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1
        }
      ]
    });
  }, []);

  return (
    <div className="p-8">
      {/* Recent Logs Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-cyan-500 mb-4">Recent Log Entries</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Symptom</th>
              <th className="py-2 px-4 border-b">Severity</th>
              <th className="py-2 px-4 border-b">Notes</th>
            </tr>
          </thead>
          <tbody>
            {recentLogs.map((log, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{log.date}</td>
                <td className="py-2 px-4 border-b">{log.symptom}</td>
                <td className="py-2 px-4 border-b">{log.severity}</td>
                <td className="py-2 px-4 border-b">{log.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Symptom Trend Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-cyan-500 mb-4">Symptom Severity Trends</h2>
        <Line data={trendData} />
      </div>
    </div>
  );
};

export default LoggingHistory;
