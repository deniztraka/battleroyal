var config = require('./server/common/config.js');
var constants = require('./server/common/constants.js');

var GameServer = require('./server/gameServer.js');

var express = require('express');
var app = express();
var serv = require('http').Server(app);
var io = require('socket.io')(serv, {});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use('/public', express.static(__dirname + '/public'));

// opening web server
serv.listen(process.env.PORT || config.server.port, function(s) {
    console.log('listening on port' + config.server.port);
});

//opening game server
var gameServer = new GameServer(io);
gameServer.start();