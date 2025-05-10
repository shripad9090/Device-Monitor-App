import React, { useState } from 'react';
import DeviceScreen from './components/DeviceScreen';
import './App.css';

function App() {
  const [activeDevice, setActiveDevice] = useState('D1');

  return (
    <div className="App">
      <h1>Device Monitor</h1>
      <div className="navigation">
        <button onClick={() => setActiveDevice('D1')}>View D1</button>
        <button onClick={() => setActiveDevice('D2')}>View D2</button>
      </div>
      <DeviceScreen deviceId={activeDevice} />
    </div>
  );
}

export default App;
