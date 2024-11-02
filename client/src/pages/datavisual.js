import React, { useState } from 'react';
import { LineChart, BarChart, PieChart, AreaChart, Line, Bar, Pie, Cell, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import salesData from './data.json';
import Navbar from '../components/Navbar';


function HardcodedChart() {
  // Hardcoded data for the chart
    const data = salesData;

  const navigate = useNavigate();


  const [chartType, setChartType] = useState('Line');

  // Function to navigate back to home
  const returnHome = () => {
    navigate("/");
  };

  // Function to handle chart type selection
  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <h1>Data Visual</h1>
      <button onClick={returnHome}>Return to Home</button> {/* Button to return to home */}

      <div>
        <label htmlFor="chartType">Select Chart Type: </label>
        <select id="chartType" value={chartType} onChange={handleChartTypeChange}>
          <option value="Line">Line Chart</option>
          <option value="Bar">Bar Chart</option>
          <option value="Pie">Pie Chart</option>
          <option value="Area">Area Chart</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
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
  );
}

export default HardcodedChart;
