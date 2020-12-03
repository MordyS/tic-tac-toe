const express = require('express');
const app = express();
const path = require('path');
const socket = require("socket.io");
const port = process.env.PORT || 5050

app.use(express.static(path.join(__dirname, 'client/dist/client')))

const server = app.listen(port, () => console.log('server is listening on port ' + server.address().port))
const io = socket(server);

let games = []

io.on("connection", function (socket) {
  socket.on("start", () => {
    console.log('start ' + socket.id)
    const game = games.findIndex(g => g.playerX && !g.playerO)
    if (game >= 0) {
      games[game].playerO = socket.id
      socket.emit('symbol', 'O')
      const opponent = games[game].playerX
      if (opponent) io.to(opponent).emit('message', '')
    } else {
      games.push({ playerX: socket.id })
      socket.emit('symbol', 'X')
      socket.emit('message', 'Wait for opponent to join')
    }
  })
  socket.on("disconnect", () => {
    console.log("disconnected: ", socket.id)
    const game = games.findIndex(g => [g.playerX, g.playerO].includes(socket.id))
    if (game == -1) return
    const playerSymbol = games[game].playerX == socket.id ? 'playerX' : 'playerO'
    const opponent = games[game][playerSymbol == 'playerX' ? 'playerO' : 'playerX']
    if (opponent) io.to(opponent).emit('message', 'opponent left')
    games.splice(game, 1)
  });

  socket.on('clicked', data => {
    const game = games.findIndex(g => [g.playerX, g.playerO].includes(socket.id))
    if (game == -1) return
    const opponent = games[game][data.symbol == 'X' ? 'playerO' : 'playerX']
    if (opponent) io.to(opponent).emit('madeMove', data)
  })

});
