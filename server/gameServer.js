var config = require('./common/config.js');
var logger = require('./common/logger.js');
var utils = require('./common/utils.js');
var NetworkedWorld = require('./network/networkedWorld.js');

module.exports = class GameServer {
    constructor(io) {
        // server props
        this.lastTimeSeconds = 0;
        this.totalElapsedTimeFromSeconds = 0;
        this.timer = null;

        this.networkedWorld = new NetworkedWorld(io);
    }

    start() {
        let self = this;
        this.timer = setInterval(function() {
            self.mainLoop();
        }, 1000 * config.server.serverProcessFrequency);

    }

    mainLoop() {
        let self = this;
        this.totalElapsedTimeFromSeconds += config.server.serverProcessFrequency;
        let deltaTime = this.totalElapsedTimeFromSeconds - this.lastTimeSeconds;


        this.networkedWorld.process(deltaTime);


        utils.timerMechanics.executeByIntervalFromSeconds(this.totalElapsedTimeFromSeconds, 1 / 60,
            function() {
                self.networkedWorld.updateClientsPositions();
            });

        this.networkedWorld.totalElapsedTimeFromSeconds = this.totalElapsedTimeFromSeconds;
        this.lastTimeSeconds = this.totalElapsedTimeFromSeconds;

        //Terminal Logging
        utils.timerMechanics.executeByIntervalFromSeconds(this.totalElapsedTimeFromSeconds, 1,
            function() {
                logger.terminal.debug("Total elapsed time from seconds: " + Math.floor(self.totalElapsedTimeFromSeconds));
            });
    }

    stop() {
        clearInterval(this.timer);
    }
};