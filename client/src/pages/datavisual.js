import React, { useState, useRef } from 'react';
import { LineChart, BarChart, PieChart, AreaChart, Line, Bar, Pie, Cell, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import salesData from './data.json';

function HardcodedChart() {
  const data = salesData;

  const navigate = useNavigate();
  const chartRef = useRef(); // Reference to the chart container

  const [chartType, setChartType] = useState('Line');

  // Function to navigate back to the previous page
  const returnPreviousPage = () => {
    navigate(-1); 
  };

  // Function to handle chart type selection
  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  // Function to export the chart as an image
  const exportChart = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current, {
        useCORS: true,
      });
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'chart.png';
      link.click();
    }
  };

  return (
    <div>
      <h1>Data Visual</h1>
      <button onClick={returnPreviousPage}>Go Back</button> {/* Button to return to the previous page */}
      <button onClick={exportChart}>Export Chart as PNG</button> {/* Button to export chart as PNG */}

      <div>
        <label htmlFor="chartType">Select Chart Type: </label>
        <select id="chartType" value={chartType} onChange={handleChartTypeChange}>
          <option value="Line">Line Chart</option>
          <option value="Bar">Bar Chart</option>
          <option value="Pie">Pie Chart</option>
          <option value="Area">Area Chart</option>
        </select>
      </div>

      {/* Chart container with ref to capture */}
      <div ref={chartRef} style={{ position: 'relative', width: '100%', height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'Line' && (
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          )}

          {chartType === 'Bar' && (
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#82ca9d" />
            </BarChart>
          )}

          {chartType === 'Pie' && (
            <PieChart>
              <Pie
                data={data}
                dataKey="sales"
                nameKey="month"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'][index % 5]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}

          {chartType === 'Area' && (
            <AreaChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default HardcodedChart;
