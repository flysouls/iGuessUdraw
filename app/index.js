
const express = require('express');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const chat = require('./chat');
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../public')));
app.use((ctx, next) => {
  console.log(ctx.url, path.resolve(__dirname, '../public'));
})

function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
  chat(socket);
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
