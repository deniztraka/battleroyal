var config = require('../common/config.js');
var constants = require('../common/constants.js');
var Player = require('../core/player.js');
var InputProcessor = require('./inputProcessor.js');

module.exports = class NetworkedClient {
    constructor(socket, name, position) {
        let self = this;
        this.player = new Player(name, position);
        this.socket = socket;
        this.inputProcessor = new InputProcessor(socket, this.player);
    }
};