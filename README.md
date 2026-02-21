
# Pulse Observer ⚡

A lightweight, real-time Node.js performance monitoring tool that displays **Event Loop Lag**, **Heap Memory Usage**, and **Slow APIs** directly in your terminal. Ideal for development and quick debugging in Express-based applications.


## Features

- Real-time **Event Loop Lag** monitoring (detects when the event loop is blocked)
- **Heap Used** memory tracking (helps spot memory leaks early)
- Top 5 **Slow APIs** list (only APIs taking >50ms, with color coding: green/yellow/red)
- Simple Express middleware integration (measures time automatically for all routes)
- Colorful terminal output using Chalk
- Zero external services or heavy dependencies (only Chalk is required)

## Installation

```bash
npm install pulse-observer
Or with Yarn:
yarn add pulse-observer

Note: This library uses Chalk v4 (CommonJS compatible). If Chalk v5 gets installed by mistake (ESM-only), downgrade it:
Bashnpm install chalk@4

// Quick Start (Express App)
JavaScript// server.js or app.js
const express = require('express');
const app = express();

// Import and initialize Pulse Observer
const Pulse = require('pulse-observer');

const pulse = new Pulse({
  interval: 1000, // How often to refresh the display (in ms)
});

app.use(pulse.middleware());  // ← This line is required!

app.use(express.json());

// Example route (will show up if slow)
app.post('/api/user/create', async (req, res) => {
  // Your logic here...
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

Once the server starts and you hit some routes (e.g., via Postman or browser), you'll see real-time output in the terminal like this:
text⚡ Pulse Observer
Event Loop Lag: 10.28 ms
Heap Used: 30.1 MB
Slow APIs (only >50ms):
POST /api/user/create → 110.7ms


//Customization Options

You can pass options when creating the Pulse instance:
JavaScriptconst pulse = new Pulse({
  interval: 2000,         // Refresh interval in milliseconds (default: 1000)
  // threshold: 100       // Future feature: only show APIs slower than this value
  // renderer: 'terminal' // Currently only terminal is supported
});


//Debugging Slow Routes
When a slow API appears (e.g., >100ms):

Add manual timing inside the route handler to pinpoint the bottleneck:JavaScriptconst start = process.hrtime.bigint();
// Your DB or heavy logic here
const ms = Number(process.hrtime.bigint() - start) / 1e6;
console.log('This block took:', ms.toFixed(2), 'ms');


Why Use Pulse Observer?

No external dashboards, Prometheus, or paid services needed
Real-time feedback in your terminal while developing
Extremely lightweight (~30MB heap usage)
Open for contributions (future ideas: file logging, alerts, web dashboard)

License
ISC License – feel free to use, modify, and distribute.