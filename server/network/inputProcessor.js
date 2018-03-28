var config = require('../common/config.js');
var constants = require('../common/constants.js');

module.exports = class InputProcessor {
    constructor(socket, player) {
        let self = this;
        this.player = player;
        this.socket = socket;
        this.attachEvents();
    }

    onUpKeyPressed(isDown) {
        this.player.movementStates.isMovingUp = isDown;
    }
    onDownKeyPressed(isDown) {
        this.player.movementStates.isMovingDown = isDown;
    }
    onLeftKeyPressed(isDown) {
        this.player.movementStates.isMovingLeft = isDown;
    }
    onRightKeyPressed(isDown) {
        this.player.movementStates.isMovingRight = isDown;
    }
    onShiftKeyPressed(isDown) {
        this.player.movementStates.isRunning = isDown;
    }
    updateRotation(mousePosition) {
        this.player.mousePosition = mousePosition;
    }
    onMouseClicked(mousePosition) {
        this.player.attack();
    }

    attachEvents() {
        var self = this;

        //attach mouse position event
        this.socket.on(constants.eventNames.fromClient.mousePosition, function(mousePos) {
            updateRotation(mousePos);
        });

        //attach movement events
        this.socket.on(constants.eventNames.fromClient.OnUpKeyPressed, function(isDown) {
            self.onUpKeyPressed(isDown);
        });
        this.socket.on(constants.eventNames.fromClient.OnDownKeyPressed, function(isDown) {
            self.onDownKeyPressed(isDown);
        });
        this.socket.on(constants.eventNames.fromClient.OnLeftKeyPressed, function(isDown) {
            self.onLeftKeyPressed(isDown);
        });
        this.socket.on(constants.eventNames.fromClient.OnRightKeyPressed, function(isDown) {
            self.onRightKeyPressed(isDown);
        });
        this.socket.on(constants.eventNames.fromClient.OnEKeyPressed, function(isDown) {
            self.OnEKeyPressed(isDown);
        });
        this.socket.on(constants.eventNames.fromClient.OnShiftKeyPressed, function(isDown) {
            self.onShiftKeyPressed(isDown);
        });
        this.socket.on(constants.eventNames.fromClient.OnMouseClicked, function(mousePosition) {
            self.onMouseClicked();
        });
    }
};