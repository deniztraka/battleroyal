var config = require('../common/config.js');
var constants = require('../common/constants.js');

module.exports = class InputProcessor {
    constructor(socket, player) {
        let self = this;
        this.player = player;
        this.socket = socket;
        this.attachEvents();
    }

    attachEvents() {
        var self = this;
        this.socket.on("clicked", function() {
            self.player.name = "denoi";
        });
    }

};