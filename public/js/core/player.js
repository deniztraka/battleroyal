function Player(game, x, y) {
    this.game = game;  
    Phaser.Sprite.call(this, game, x, y, "player");
    game.add.existing(this);     

    //this.body.setSize(20, 29, 20, 35);
    this.anchor.setTo(0.5, 0.5);

    
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;