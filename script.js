let player = { name: '', wealth: 1000000, coins: 0 };
let auctions = [];

function registerPlayer() {
  const playerName = document.getElementById('player-name').value;
  if (!playerName) {
    alert('Please enter your name!');
    return;
  }

  player.name = playerName;
  document.getElementById('player-name-display').textContent = playerName;
  document.getElementById('player-wealth').textContent = player.wealth;
  document.getElementById('player-coins').textContent = player.coins;

  document.getElementById('register').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
  updateAuctions();
}

function createAuction(event) {
  event.preventDefault();
  const type = document.getElementById('auction-type').value;
  const items = parseInt(document.getElementById('auction-items').value);

  auctions.push({ id: auctions.length, type, items, bids: [] });
  updateAuctions();
}

function bidOnAuction(id) {
  const bidAmount = prompt('Enter your bid amount:');
  if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0 || bidAmount > player.wealth) {
    alert('Invalid bid!');
    return;
  }

  const auction = auctions.find(a => a.id === id);
  auction.bids.push({ player: player.name, amount: parseInt(bidAmount) });
  player.wealth -= parseInt(bidAmount);
  document.getElementById('player-wealth').textContent = player.wealth;
}

function updateAuctions() {
  const auctionsDiv = document.getElementById('auctions');
  auctionsDiv.innerHTML = auctions.map(a => `
    <div>
      <p>${a.items} ${a.type} up for auction</p>
      <button onclick="bidOnAuction(${a.id})">Place Bid</button>
    </div>
  `).join('');
}
