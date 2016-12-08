const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;
app.get('/',(req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(PORT, () => {
  console.log('express app listening on port', PORT);
});
