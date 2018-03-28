var config = require('../common/config.js');
var constants = require('../common/constants.js');
var logger = require('../common/logger.js');
var utils = require('../common/utils.js');

var NetworkedClient = require('./networkedClient.js');

module.exports = class NetworkedWorld {
    constructor(io) {
        let self = this;
        this.io = io;
        this.networkedClientDictionary = {};

        io.on(constants.eventNames.connect, function(socket) {
            let connectedSocket = socket;
            self.clientIsConnected(connectedSocket);
        });
    }

    clientIsConnected(socket) {
        var self = this;
        if (socket) {
            logger.terminal.audit(socket.id + " client is connected.");

            //creating random position object. thiss will be gathered by another logic in the future
            var randomPosition = { x: utils.math.randomInt(0, 500), y: utils.math.randomInt(0, 500) };
            var pName = socket.handshake.query.name;

            //connected client is added to the dictionary
            self.networkedClientDictionary[socket.id] = new NetworkedClient(socket, pName, randomPosition);



            //emitin an event to client for creating already logged in players
            socket.emit(constants.commandNames.createLoggedInPlayers, self.getPlayersExcept(socket.id));
            //emiting an event to client for creating its local player 
            socket.emit(constants.commandNames.createLocalPlayer, { position: randomPosition, name: pName });
            //emiting an event to clients except this socket for creating creating this newly logged in player
            socket.broadcast.emit(constants.commandNames.createNewRemotePlayer, { socketId: socket.id, position: randomPosition, name: pName });

            socket.on(constants.eventNames.disconnect, function() {
                self.clientIsDisconnected(socket);
            });
        }
    }

    clientIsDisconnected(socket) {
        if (socket) {
            //send disconnected player socketId to the all clients except this socket
            socket.broadcast.emit(constants.commandNames.removePlayer, { "socketId": socket.id });

            delete this.networkedClientDictionary[socket.id];
            logger.terminal.audit(socket.id + " client is disconnected;");
        }
    }

    getPlayersExcept(pSocketId) {
        var playerList = [];
        if (Object.size(this.networkedClientDictionary) > 0) {
            for (var key in this.networkedClientDictionary) {
                if (pSocketId == key) {
                    continue;
                } else {
                    //prepare playerList to send clients
                    playerList.push({
                        socketId: key,
                        position: this.networkedClientDictionary[key].player.position,
                        name: this.networkedClientDictionary[key].player.name
                    });
                }
            }
        }

        return playerList;
    }

    process() {
        //update client position and rotation data
        for (var key in this.networkedClientDictionary) {
            var networkedClient = this.networkedClientDictionary[key];
            if (networkedClient) {
                //console.log(networkedClient.player.movementStates.isMovingUp + " " + networkedClient.player.movementStates.isMovingDown + " " + networkedClient.player.movementStates.isMovingLeft + " " + networkedClient.player.movementStates.isMovingRight);
                console.log(networkedClient.player.position.x + " " + networkedClient.player.position.y);
            }
        }
    }
};