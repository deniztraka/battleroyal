﻿GameStates.Game = function(game) {
    this.socket = null;
};


GameStates.Game.prototype = {
    init: function(playerName) {
        this.playerName = playerName;
    },
    preload: function() {
        var self = this;
        self.game.time.advancedTiming = true;
        $(window).resize(function() {
            self.resize();
        });
        self.resize();
    },
    create: function() {
        var self = this;
        this.input.mouse.capture = true;
        this.socket = io(window.location.origin, { query: 'name=' + self.playerName });
        NetworkedWorld.Init(this);
        InputManager.Init(this, this.socket);
    },
    update: function() {
        InputManager.CheckMovement();
        InputManager.CheckMousePosition();
        InputManager.CheckMouseClicks();
    },
    render: function() {},

    resize: function() {
        this.scale.setGameSize($(window).width(), $(window).height());
    },

    buildWorld: function() {
        var game = this;
        game.stage.disableVisibilityChange = true;
        game.world.setBounds(0, 0, 1920, 1920);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        // using RESIZE scale mode
        game.scale.scaleMode = Phaser.ScaleManager.SHOWALL;
        game.scale.updateLayout();
    }
};