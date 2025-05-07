import React, { useState } from "react";
import "./Dashboard.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const initialData = [
  { name: "Jan", tasks: 1200, riders: 200, cpa: 3.5 },
  { name: "Feb", tasks: 1900, riders: 270, cpa: 3.2 },
  { name: "Mar", tasks: 3000, riders: 340, cpa: 2.8 },
  { name: "Apr", tasks: 4200, riders: 480, cpa: 2.5 },
];

function Dashboard() {
  const [data, setData] = useState(initialData);
  const [newEntry, setNewEntry] = useState({ name: "", tasks: 0, riders: 0, cpa: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: name === "name" ? value : parseFloat(value) });
  };

  const handleAddEntry = () => {
    if (newEntry.name) {
      setData([...data, newEntry]);
      setNewEntry({ name: "", tasks: 0, riders: 0, cpa: 0 });
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Erranderx Dashboard</h1>

      <h2 className="section-title">Performance Metrics</h2>
      <div className="charts-container">
        <div className="chart-card">
          <h3>Tasks Completed</h3>
          <LineChart width={400} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="tasks" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </div>

        <div className="chart-card">
          <h3>Riders Onboarded</h3>
          <LineChart width={400} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="riders" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </div>

        <div className="chart-card">
          <h3>Cost Per Acquisition (CPA)</h3>
          <LineChart width={400} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cpa" stroke="#ffc658" strokeWidth={2} />
          </LineChart>
        </div>
      </div>

      <div className="add-entry-form">
        <h3>Add New Task Entry</h3>
        <input
          type="text"
          name="name"
          placeholder="Month"
          value={newEntry.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="tasks"
          placeholder="Tasks"
          value={newEntry.tasks}
          onChange={handleChange}
        />
        <input
          type="number"
          name="riders"
          placeholder="Riders"
          value={newEntry.riders}
          onChange={handleChange}
        />
        <input
          type="number"
          name="cpa"
          placeholder="CPA"
          step="0.1"
          value={newEntry.cpa}
          onChange={handleChange}
        />
        <button onClick={handleAddEntry}>Add Entry</button>
      </div>

      <h2 className="section-title">User Analytics</h2>
      <div className="analytics-container">
        <div className="analytics-card">
          <h3>User Retention Rate</h3>
          <p className="analytics-value">87%</p>
        </div>
        <div className="analytics-card">
          <h3>App Downloads</h3>
          <p className="analytics-value">12,000</p>
        </div>
        <div className="analytics-card">
          <h3>Activation Rate</h3>
          <p className="analytics-value">76%</p>
        </div>
        <div className="analytics-card">
          <h3>Net Promoter Score (NPS)</h3>
          <p className="analytics-value">+52</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;