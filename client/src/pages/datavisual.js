import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

function HardcodedChart() {
  // Hardcoded data for the chart
  const data = [
    { month: 'January', sales: 400 },
    { month: 'February', sales: 300 },
    { month: 'March', sales: 500 },
    { month: 'April', sales: 200 },
    { month: 'May', sales: 700 }
  ];
  
  const navigate = useNavigate();

  // Function to navigate back to home
  const returnHome = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Sales Data Chart</h1>
      <button onClick={returnHome}>Return to Home</button> {/* Added a button to use the function */}
      <ResponsiveContainer width="100%" height={400}>
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
      </ResponsiveContainer>
    </div>
  );
}

export default HardcodedChart;
