import React, { useState, useRef } from 'react';
import { BarChart, PieChart, AreaChart, ScatterChart, Bar, Pie, Cell, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import patientData from './data.json';
import 'bulma/css/bulma.min.css';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';

function HardcodedChart() {
  const data = patientData;

  const navigate = useNavigate();
  const chartRef = useRef(); // Reference to the chart container

  const [chartType, setChartType] = useState('Bar');
  const [dataKey, setDataKey] = useState('visits');

  // Function to navigate back to the previous page
  const returnPreviousPage = () => {
    navigate(-1);
  };

  // Function to handle chart type selection
  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  // Function to handle data key selection
  const handleDataKeyChange = (event) => {
    setDataKey(event.target.value);
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
    <div className="container">
      <div className="box has-text-centered" style={{ background: 'linear-gradient(135deg, #002a5e, #005f99)', color: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <h1 className="title has-text-white">Patient Data Visualization</h1>
        <div className="buttons is-centered">
          <button className="button is-link" onClick={returnPreviousPage} style={{ display: 'flex', alignItems: 'center' }}>
            <FaArrowLeft style={{ marginRight: '8px' }} /> Go Back
          </button>
          <button className="button is-info" onClick={exportChart} style={{ display: 'flex', alignItems: 'center' }}>
            <FaDownload style={{ marginRight: '8px' }} /> Export Chart as PNG
          </button>
        </div>

        <div className="field is-grouped is-grouped-centered" style={{ marginTop: '20px' }}>
          <label className="label has-text-white" htmlFor="chartType" style={{ marginRight: '10px' }}>Select Chart Type:</label>
          <div className="control">
            <div className="select is-info">
              <select id="chartType" value={chartType} onChange={handleChartTypeChange}>
                <option value="Bar">Bar Chart</option>
                <option value="Pie">Pie Chart</option>
                <option value="Area">Area Chart</option>
                <option value="Scatter">Scatter Chart</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field is-grouped is-grouped-centered" style={{ marginTop: '20px' }}>
          <label className="label has-text-white" htmlFor="dataKey" style={{ marginRight: '10px' }}>Select Data to Visualize:</label>
          <div className="control">
            <div className="select is-info">
              <select id="dataKey" value={dataKey} onChange={handleDataKeyChange}>
                <option value="visits">Visits</option>
                <option value="billOwed">Bill Owed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Chart container with ref to capture */}
      <div className="box" ref={chartRef} style={{ position: 'relative', width: '100%', height: '400px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <ResponsiveContainer width="100%" height="100%">
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
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={dataKey} fill="url(#gradientBar)" />
              <defs>
                <linearGradient id="gradientBar" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffc658" />
                  <stop offset="100%" stopColor="#82ca9d" />
                </linearGradient>
              </defs>
            </BarChart>
          )}

          {chartType === 'Pie' && (
            <PieChart>
              <Pie
                data={data}
                dataKey={dataKey}
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                stroke="#fff"
                strokeWidth={2}
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
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey={dataKey} stroke="#8884d8" fill="url(#gradientArea)" />
              <defs>
                <linearGradient id="gradientArea" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8dd1e1" />
                  <stop offset="100%" stopColor="#ffc658" />
                </linearGradient>
              </defs>
            </AreaChart>
          )}

          {chartType === 'Scatter' && (
            <ScatterChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="patientId" name="Patient ID" />
              <YAxis dataKey={dataKey} name={dataKey === 'visits' ? 'Visits' : 'Bill Owed'} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Patients" data={data} fill="#8884d8" />
            </ScatterChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default HardcodedChart;