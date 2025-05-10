# Device Monitor App

A desktop-style web application that monitors and displays live data for two devices using WebSocket.

## 🚀 Features

- Connects to a local WebSocket server
- Parses real-time data strings like `D1V45C32T21`
- Displays Voltage, Current, and Temperature for D1 and D2
- Switch between D1 and D2 views
- Clean and responsive UI

## 🛠️ Technologies

- **Frontend**: React
- **Backend**: Node.js + WebSocket
- **WebSocket Port**: `ws://localhost:8080`

## 📦 How to Run

### 1. Start the WebSocket Backend

```bash
cd backend
node server.js
