// Simple static server for local development
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the repository root
app.use(express.static(path.join(__dirname)));

// Optional health endpoint
app.get('/health', (req, res) => res.send('OK'));

app.listen(port, () => console.log(`Static server running at http://localhost:${port}`));
