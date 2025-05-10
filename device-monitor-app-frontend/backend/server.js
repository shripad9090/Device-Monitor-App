const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

function generateRandomData() {
  const deviceId = Math.random() < 0.5 ? 'D1' : 'D2';
  const voltage = Math.floor(Math.random() * 100);
  const current = Math.floor(Math.random() * 100);
  const temperature = Math.floor(Math.random() * 100);
  return `${deviceId}V${String(voltage).padStart(2, '0')}C${String(current).padStart(2, '0')}T${String(temperature).padStart(2, '0')}`;
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  const interval = setInterval(() => {
    ws.send(generateRandomData());
  }, 2000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});
