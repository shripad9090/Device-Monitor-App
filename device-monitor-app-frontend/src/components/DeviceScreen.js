import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

const DeviceScreen = ({ deviceId }) => {
  const [data, setData] = useState([]);
  const [latest, setLatest] = useState({ voltage: '--', current: '--', temperature: '--' });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const message = event.data;
      if (message.startsWith(deviceId)) {
        const voltage = parseInt(message.slice(3, 5));
        const current = parseInt(message.slice(6, 8));
        const temperature = parseInt(message.slice(9, 11));

        const newEntry = {
          time: new Date().toLocaleTimeString().slice(0, 8),
          voltage,
          current,
          temperature
        };

        setLatest({ voltage, current, temperature });

        setData(prev => {
          const updated = [...prev, newEntry];
          return updated.slice(-10); 
        });
      }
    };

    return () => ws.close();
  }, [deviceId]);

  return (
    <div className="device-screen">
      <h2>Live Data for {deviceId}</h2>
      <div className="data-card">
        <p><strong>Voltage:</strong> {latest.voltage} V</p>
        <p><strong>Current:</strong> {latest.current} A</p>
        <p><strong>Temperature:</strong> {latest.temperature} °C</p>
      </div>

      <h3 style={{ marginTop: '40px' }}>Real-Time Graph</h3>
      <ResponsiveContainer width="95%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="voltage" stroke="#42a5f5" />
          <Line type="monotone" dataKey="current" stroke="#66bb6a" />
          <Line type="monotone" dataKey="temperature" stroke="#ef5350" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DeviceScreen;
