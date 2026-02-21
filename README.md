
# Pulse Observer ⚡

[![npm version](https://img.shields.io/npm/v/pulse-observer.svg?style=flat-square)](https://www.npmjs.com/package/pulse-observer)
[![npm downloads](https://img.shields.io/npm/dm/pulse-observer.svg?style=flat-square)](https://www.npmjs.com/package/pulse-observer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/devduaa/pulse-observer?style=flat-square)](https://github.com/devduaa/pulse-observer)

A lightweight, real-time Node.js performance monitoring tool that displays **Event Loop Lag**, **Heap Memory Usage**, and **Slow APIs** directly in your terminal. Perfect for development and quick debugging in Express-based applications.

![Pulse Observer in action](https://via.placeholder.com/800x400?text=Pulse+Observer+Terminal+Output)  
*(Replace this placeholder with a real screenshot of the terminal output – upload it to the repo and update the link.)*

## Features

- Real-time **Event Loop Lag** monitoring (detects event loop blocks)
- **Heap Used** memory tracking (helps catch memory leaks early)
- Top 5 **Slow APIs** list (only >50ms, color-coded: green/yellow/red)
- Simple Express middleware integration (auto-measures all routes)
- Colorful terminal output using Chalk
- Zero external services or heavy dependencies

## Installation

```bash
npm install pulse-observer
# or
yarn add pulse-observer
## Installation


Note: This library uses Chalk v4 (CommonJS compatible). If Chalk v5 gets installed by mistake (ESM-only), downgrade it:
Bashnpm install chalk@4

CommonJS (require)
const express = require('express');
const app = express();

const Pulse = require('pulse-observer');
const pulse = new Pulse({
  interval: 1000, // refresh every 1 second (default)
});

app.use(pulse.middleware());  // ← Required!

app.use(express.json());

// Example slow route
app.post('/api/user/create', async (req, res) => {
  // your logic...
  res.json({ success: true });
});

app.listen(3000, () => console.log('Server running'));

ESM (import)
import express from 'express';
const app = express();

import Pulse from 'pulse-observer';
const pulse = new Pulse({
  interval: 1000,
});

app.use(pulse.middleware());

app.use(express.json());

// Example route...
app.listen(3000, () => console.log('Server running'));


//Slow API Colors
Time RangeColorMeaning>100msRed (bold)
Critical – investigate50–100msYellowMedium 
consider optimizing<50msGreenFast – no issue

Once the server starts and you hit some routes (e.g., via Postman or browser), you'll see real-time output in the terminal like this:
text⚡ Pulse Observer
Event Loop Lag: 10.28 ms
Heap Used: 30.1 MB
Slow APIs (only >50ms):
POST /api/user/create → 110.7ms


Customization
Pass options to the Pulse constructor:
JavaScriptconst pulse = new Pulse({
  interval: 2000,         // Refresh interval in ms
  // threshold: 100       // Future: only show > this value
  // renderer: 'terminal' // Currently only terminal
});


//Debugging Slow Routes
When a slow API appears (e.g., >100ms):

Add manual timing inside the route handler to pinpoint the bottleneck:JavaScriptconst start = process.hrtime.bigint();
// Your DB or heavy logic here
const ms = Number(process.hrtime.bigint() - start) / 1e6;
console.log('This block took:', ms.toFixed(2), 'ms');


Why Pulse Observer?

No external dashboards or paid tools required
Instant terminal feedback during development
Extremely lightweight (~30MB heap usage)
Open for contributions

Future Plans

Configurable slow API threshold
Web dashboard renderer
File logging & alerts
Auto-suggestions for slow routes

Contributing
Contributions are welcome!

Open an issue for bugs/ideas
Fork → Branch → Commit → Push → Pull Request

License
MIT License – feel free to use, modify, and distribute.