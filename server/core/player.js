module.exports = class Player {
    constructor(name, position) {
        this.name = name;
        this.position = position;
        this.moveSpeed = 10;
        this.movementStates = {
            isMovingUp: false,
            isMovingDown: false,
            isMovingLeft: false,
            isMovingRight: false,
            isRunning: false
        };
    }
};