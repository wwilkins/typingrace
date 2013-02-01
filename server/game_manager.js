var crypto = require('crypto');

var Game = function () {
  var id = crypto.createHash('md5').update((new Date).toString()).digest('hex');
  return {
    id : id,
    players : [],
    isFull : function () {
      return (players.length === 2);
    },
    addPlayer : function(player) {
     this.players.push(player);
     player.game = this;
    }
  };
};

module.exports.gameManager = function GameManager () {
  var games = [];
  return {
    connectToGame : function (client) {
      var foundGame = undefined;
      games.forEach(function(game) {
        if (foundGame) return;
        foundGame = game;
        console.log('found game:'+ game.id);
      });

      if (!foundGame) {
        foundGame = new Game();
        games.push(foundGame);
      }

      foundGame.addPlayer(client);
    }
  };
}