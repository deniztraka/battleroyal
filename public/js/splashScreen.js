﻿GameStates.SplashScreen = function (game) {

};

GameStates.SplashScreen.prototype = {

    create: function () {
        //below code creates a simple tween animation. You will want to delete this when adding your code
        // var logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
        // logo.anchor.setTo(0.5, 0.5);
        // logo.scale.setTo(0.2, 0.2);
        // this.add.tween(logo.scale).to({ x: 1, y: 1 }, 3000, Phaser.Easing.Bounce.Out, true);
        // //call next state
        // var self = this;
        // setTimeout(function () { self.state.start('MainMenu'); }, 4000);
        this.state.start('MainMenu');
    },

    update: function () { },

    render: function () { },
};

