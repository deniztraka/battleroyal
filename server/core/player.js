module.exports = class Player {
    constructor(name, position) {
        this.name = name;
        this.position = position;
        this.movementSpeed = 10;
        this.mousePosition = { x: 0, y: 0 };
        this.movementStates = {
            isMovingUp: false,
            isMovingDown: false,
            isMovingLeft: false,
            isMovingRight: false,
            isRunning: false
        };

        this.attack = function(mousePosition) {
            console.log(this.name + " is attacked");
        };
    }
};