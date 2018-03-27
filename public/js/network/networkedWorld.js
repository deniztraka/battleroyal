var NetworkedWorld = (function(my) {
    var game;
    var clientList = {};


    function attachEvents() {
        game.socket.on("s_CreateLocalPlayer", createLocalPlayer);
        game.socket.on("s_CreateLoggedInPlayers", createLoggedInPlayers);
        game.socket.on("s_RemovePlayer", removePlayer);
        game.socket.on("s_CreateNewRemotePlayer", createNewRemotePlayer);
    }

    function createLocalPlayer(socketData) {
        var networkedClient = new NetworkedClient(game);
        networkedClient.player = new Player(game, socketData.position.x, socketData.position.y);
        networkedClient.player.nickname = socketData.name;
        clientList[game.socket.id] = networkedClient;
        console.log("local player is " + networkedClient.socket.id);
    }

    function createNewRemotePlayer(remotePlayerData) {
        createRemotePlayer(remotePlayerData);
    }

    function createRemotePlayer(remotePlayerData) {
        var networkedClient = new NetworkedClient(game);
        networkedClient.socket = { id: remotePlayerData.socketId };
        networkedClient.player = new Player(game, remotePlayerData.position.x, remotePlayerData.position.y);
        networkedClient.player.nickname = remotePlayerData.name;
        clientList[remotePlayerData.socketId] = networkedClient;
        console.log("remote player is logged in." + remotePlayerData.socketId);
    }

    function createLoggedInPlayers(socketData) {
        var alreadyLoggedInPlayersData = socketData;

        alreadyLoggedInPlayersData.forEach(remotePlayerData => {
            createRemotePlayer(remotePlayerData);
        });
    }

    function removePlayer(socketData) {
        var networkedClient = clientList[socketData.socketId];
        console.log(socketData.socketId + "is removed from world.");
        if (networkedClient) {
            networkedClient.player.destroy();
            delete clientList[socketData.socketId];
        }
    }

    my.ProcessWorld = function() {

    };

    my.Init = function(_game) {
        game = _game;
        attachEvents();
    };

    return my;
}(NetworkedWorld || {}));