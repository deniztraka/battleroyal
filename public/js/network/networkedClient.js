function NetworkedClient(game) {
    this.socket = game.socket;
    this.player = new Player(game,20,20);
    
}
