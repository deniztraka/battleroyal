var config = require('../common/config.js');
var constants = require('../common/constants.js');

module.exports = class InputProcessor {
    constructor(socket, player) {
        let self = this;
        this.player = player;
        this.socket = socket;
        this.attachEvents();
        this.inputQueue = [];
    }

    process() {

        //check number of inputs in the array and remove it to another array for processing.
        let numberOfInputsToBeProcessed = this.inputQueue.length;
        let inputObjectsToBeProcessed = [];
        for (let i = 0; i < numberOfInputsToBeProcessed; i++) {
            inputObjectsToBeProcessed.push(this.inputQueue.shift());
        }

        //process it
        inputObjectsToBeProcessed.forEach(inputObj => {
            if (inputObj.func) {
                inputObj.func.call(this, inputObj.params);
                this.processMovements();
            }
        });

        this.processMovements();

        //console.log("number of inputs processed by server step:" + numberOfInputsToBeProcessed);
    }

    processMovements() {
        var currentSpeed = this.player.movementSpeed;
        if (this.player.movementStates.isRunning) {
            currentSpeed = this.player.movementSpeed * constants.game.player.runningSpeedMultiplier;
        }

        if (this.player.movementStates.isMovingUp) {
            //player.velocity[1] = -player.speed;
            this.player.position.y -= currentSpeed;
            //setPlayerZone(player, false);
        }
        if (this.player.movementStates.isMovingDown) {
            //player.velocity[1] = player.speed;
            this.player.position.y += currentSpeed;
            //setPlayerZone(player, false);
        }

        if (this.player.movementStates.isMovingLeft) {
            //player.velocity[0] = -player.speed;
            this.player.position.x -= currentSpeed;
            //setPlayerZone(player, true);
        }
        if (this.player.movementStates.isMovingRight) {
            //player.velocity[0] = player.speed;
            this.player.position.x += currentSpeed;
            //setPlayerZone(player, true);
        }

        // player.previousPosition[0] = player.position[0];
        // player.previousPosition[1] = player.position[0];
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
    updateMousePosition(mousePosition) {
        this.player.mousePosition = mousePosition;
    }
    onMouseClicked(mousePosition) {
        this.player.attack(mousePosition);
    }

    attachEvents() {
        var self = this;

        //attach mouse position event
        this.socket.on(constants.eventNames.fromClient.OnMousePosition, function(mousePos) {
            self.inputQueue.push({ func: self.updateMousePosition, params: mousePos });
        });

        //attach movement events
        this.socket.on(constants.eventNames.fromClient.OnUpKeyPressed, function(isDown) {
            self.inputQueue.push({ func: self.onUpKeyPressed, params: isDown });
        });
        this.socket.on(constants.eventNames.fromClient.OnDownKeyPressed, function(isDown) {
            self.inputQueue.push({ func: self.onDownKeyPressed, params: isDown });
        });
        this.socket.on(constants.eventNames.fromClient.OnLeftKeyPressed, function(isDown) {
            self.inputQueue.push({ func: self.onLeftKeyPressed, params: isDown });
        });
        this.socket.on(constants.eventNames.fromClient.OnRightKeyPressed, function(isDown) {
            self.inputQueue.push({ func: self.onRightKeyPressed, params: isDown });
        });
        this.socket.on(constants.eventNames.fromClient.OnEKeyPressed, function(isDown) {
            self.inputQueue.push({ func: self.onEKeyPressed, params: isDown });
        });
        this.socket.on(constants.eventNames.fromClient.OnShiftKeyPressed, function(isDown) {
            self.inputQueue.push({ func: self.onShiftKeyPressed, params: isDown });
        });
        this.socket.on(constants.eventNames.fromClient.OnMouseClicked, function(mousePosition) {
            self.inputQueue.push({ func: self.onMouseClicked, params: mousePosition });
        });
    }
};