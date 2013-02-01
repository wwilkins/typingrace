var crypto = require('crypto');

var Game = function (now) {
  var id = crypto.createHash('md5').update((new Date).toString()).digest('hex');
   var group = now.getGroup(id);
   var enteredText = {};

  return {
    id : id,
    players : [],
    isFull : function () {
      return (players.length === 2);
    },
    addPlayer : function(now, clientId) {
     console.log(clientId);
     this.players.push(clientId);
      now.playerId = clientId;
     now.game = this;
     group.addUser(clientId);
    },
    end : function() {
      group.now.gameDidEnd();
    },
    updatePlayerText : function (playerId, text) {
      enteredText[playerId] = text;
      group.now.playerTextDidUpdate(enteredText);
    }
  };
};

module.exports.gameManager = function GameManager (ddfadf, clientId) {
  var games = [],
    nowjs = ddfadf;

  return {
    connectToGame : function (now, client) {
      var foundGame = undefined;
      games.forEach(function(game) {
        if (foundGame) return;
        foundGame = game;
        console.log('found game:'+ game.id);
      });

      if (!foundGame) {
        foundGame = new Game(nowjs);
        games.push(foundGame);
      }

      foundGame.addPlayer(now, client);
    },
    endGame : function (gameId) {
      var game = undefined;
      games.forEach(function(g){
        if (g.id === gameId) {
          game = g;
        }
      });

      games.end();
    }
  };
}