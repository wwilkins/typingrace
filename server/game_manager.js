var crypto = require('crypto');
var quotes = ["By method and discipline are to be understood the marshaling of the army in its proper subdivisions, the graduations of rank among the officers, the maintenance of roads by which supplies may reach the army, and the control of military expenditure.","The general that hearkens to my counsel and acts upon it, will conquer: let such a one be retained in command! The general that hearkens not to my counsel nor acts upon it, will suffer defeat:--let such a one be dismissed!", "While heading the profit of my counsel, avail yourself also of any helpful circumstances over and beyond the ordinary rules. According as circumstances are favorable, one should modify one's plans. All warfare is based on deception.  Hence, when able to attack, we must seem unable; when using our forces, we must seem inactive; when we are near, we must make the enemy believe we are far away; when far away, we must make him believe we are near.", "Now the general who wins a battle makes many calculations in his temple ere the battle is fought. The general who loses a battle makes but few calculations beforehand. Thus do many calculations lead to victory, and few calculations to defeat: how much more no calculation at all! It is by attention to this point that I can foresee who is likely to win or lose. ", "Sun Tzu said: In the operations of war, where there are in the field a thousand swift chariots, as many heavy chariots, and a hundred thousand mail-clad soldiers, with provisions enough to carry them a thousand li, the expenditure at home and at the front, including entertainment of guests, small items such as glue and paint, and sums spent on chariots and armor, will reach the total of a thousand ounces of silver per day. Such is the cost of raising an army of 100,000 men.", "Now, when your weapons are dulled, your ardor damped, your strength exhausted and your treasure spent, other chieftains will spring up to take advantage of your extremity. Then no man, however wise, will be able to avert the consequences that must ensue."];

var Game = function (now) {
  var id = crypto.createHash('md5').update((new Date).toString()).digest('hex');
  var group = now.getGroup(id);
  var enteredText = {};
  var quote = quotes[Math.floor(Math.random()*6)];

  return {
    id : id,
    players : [],
    isFull : function () {
      return (players.length >= 2);
    },
    addPlayer : function(now, clientId) {
     console.log(clientId);
     this.players.push(clientId);
      now.playerId = clientId;
     now.game = this;
     group.addUser(clientId);
      group.now.playerDidConnect();
    },
    end : function() {
      group.now.gameDidEnd();
    },
    updatePlayerText : function (playerId, text) {
      enteredText[playerId] = text;

      group.now.playerTextDidUpdate(playerId, text);
      if (text === quote) {
        this.end();
      }
    },
    text: quote
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