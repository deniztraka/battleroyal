var NetworkedWorld = (function (my) {
    var game;
    var playerList = {};    


    function attachEvents(){
        game.socket.on("s_CreateLocalPlayer",createLocalPlayer);
    }

    function createLocalPlayer(){
        var networkedClient = new NetworkedClient(game);
        playerList[game.socket.id] = networkedClient;
    };

    my.ProcessWorld = function(){

    }

    my.Init = function (_game) {
        game = _game;
        attachEvents();
    };

    return my;
}(NetworkedWorld || {}));