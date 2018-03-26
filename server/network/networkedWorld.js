var config = require('../common/config.js');
var constants = require('../common/constants.js');
var logger = require('../common/logger.js');

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

            //connected client is added to the dictionary
            self.networkedClientDictionary[socket.id] = new NetworkedClient(socket, socket.handshake.query.name);

            socket.emit(constants.commandNames.createLocalPlayer);



            socket.on(constants.eventNames.disconnect, function() {
                self.clientIsDisconnected(socket);
            });
        }
    }

    clientIsDisconnected(socket) {
        if (socket) {
            delete this.networkedClientDictionary[socket.id]
            logger.terminal.audit(socket.id + " client is disconnected;");
        }
    }

    process() {
        //update client position and rotation data
        for (var key in this.networkedClientDictionary) {
            var networkedClient = this.networkedClientDictionary[key];
            if (networkedClient) {
                console.log(networkedClient.player.name);
            }
        }
    }
};