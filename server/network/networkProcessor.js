var config = require('./common/config.js');

module.exports = class NetworkProcessor {
    constructor(io) {
        this.io = io;

        io.on(constants.eventNames.connect, function(socket) {
            this.clientConnected(socket);
        });
    }

    clientConnected(socket) {

    }
};