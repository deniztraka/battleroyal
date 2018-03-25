﻿var GameEngine = (function (my) {
    var game;
    var playerList = {};
    my.Init = function (_game) {
        game = _game;
    };

    my.CreateLocalPlayer = function (playerData) {
        var localPlayer = new ClientPlayer(game, playerData.id, playerData.name, playerData.position,true);        
        game.camera.follow(localPlayer.sprite);
        playerList[playerData.id] = localPlayer;
    };

    my.CreateNewRemotePlayer = function (playerData) {
        playerList[playerData.id] = new ClientPlayer(game, playerData.id, playerData.name, playerData.position,false);
    };

    my.UpdatePlayerPositionsAndRotations = function (playerPositionsAndRotationsDatas) {
        for (var id in playerPositionsAndRotationsDatas) {
            var playerPositionAndRotationData = playerPositionsAndRotationsDatas[id];
            var player = playerList[id];
            if (player) {

                if (playerPositionAndRotationData.positions.length == 3) {
                    var pos0 = playerPositionAndRotationData.positions[0];
                    var pos1 = playerPositionAndRotationData.positions[1];
                    var pos2 = playerPositionAndRotationData.positions[2];
                    
                    var nickNameTextYOffSet = player.playerSpriteVisibleHeight + player.nickNameText.height/2;
                    game.add.tween(player.nickNameText).to(
                        {
                            x: [pos0.x, pos1.x, pos2.x],
                            y: [pos0.y - nickNameTextYOffSet, pos1.y - nickNameTextYOffSet, pos2.y - nickNameTextYOffSet]
                        }, 1000 / 10, Phaser.Easing.Linear.None, true);

                    game.add.tween(player.sprite).to(
                        {
                            x: [pos0.x, pos1.x, pos2.x],
                            y: [pos0.y, pos1.y, pos2.y]
                        }, 1000 / 10, Phaser.Easing.Linear.None, true);
                }

                if (playerPositionAndRotationData.rotations.length == 3) {
                    var rot0 = playerPositionAndRotationData.rotations[0];
                    var rot1 = playerPositionAndRotationData.rotations[1];
                    var rot2 = playerPositionAndRotationData.rotations[2];

                    game.add.tween(player.sprite).to({ rotation: [rot0, rot1, rot2] }, 1000 / 10, Phaser.Easing.Linear.None, true);
                }
            }
        }
    };

    my.RemovePlayer = function(playerData) {
        playerList[playerData.id].sprite.destroy();

        delete playerList[playerData.id];
    };

    return my;
}(GameEngine || {}));