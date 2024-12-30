const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

let players = [];
let auctions = [];
let autoAuctions = [];

// Add middleware
app.use(express.json());
app.use(express.static('public'));

// Player Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  let player = players.find(p => p.username === username);
  if (player && player.password === password) {
    res.status(200).json(player);
  } else {
    res.status(400).send('Invalid login');
  }
});

// Auctions
io.on('connection', (socket) => {
  socket.on('create-auction', (data) => {
    auctions.push(data);
    io.emit('update-auctions', auctions);
  });

  socket.on('place-bid', (data) => {
    let auction = auctions.find(a => a.id === data.auctionId);
    if (auction) {
      auction.bids.push(data);
      io.emit('update-auctions', auctions);
    }
  });
});

// Start server
server.listen(3000, () => {
  console.log('Server running on port 3000');
});
