const express = require('express');
const app = express();
app.use(express.json());

let players = [];
let auctions = [];

// Endpoints
app.post('/register', (req, res) => {
  const { name } = req.body;
  players.push({ name, wealth: 1000000, coins: 0 });
  res.status(200).send('Player registered');
});

app.get('/auctions', (req, res) => {
  res.json(auctions);
});

app.post('/auction', (req, res) => {
  const { type, items } = req.body;
  auctions.push({ id: auctions.length, type, items, bids: [] });
  res.status(200).send('Auction created');
});

// Start Server
app.listen(3000, () => console.log('Server running on port 3000'));
