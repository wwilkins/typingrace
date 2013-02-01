TR = {};

TR.signIn = function (name) {
  now.connectToGame();
}

// now functions
now.gameDidEnd = function() {
  console.log("Game" + now.game.id + "Is Ending");
};

now.playerTextDidUpdate = function(playerId, text) {
  console.log(playerId);
  console.log(text);
  $('.progress-other .bar').width(TR.progressPercent(text.length));
  $('textbox#other').val(text);
};

TR.prepareGame = function () {
    TR.quote = quotes[Math.floor(Math.random()*6)];
};

TR.startGame = function () {
    $('textarea#prompt').text(TR.quote);
    TR.yourTextbox = new TR.Textbox($('textarea#you'));
    TR.otherTextbox = new TR.Textbox($('textarea#other'));
};

TR.Textbox = function (el) {
    this.el = $(el);
    this.el.on('keypress', _.bind(function (e) {
        this.value = this.el.val();
        this.valueLength = this.value.length;
        if (TR.quote[this.valueLength].charCodeAt() !== e.keyCode && e.keyCode !== 8 ) {
            $('body').addClass('red');
            _.delay(function () {
                $('body').removeClass('red');
            }, 50);
            e.preventDefault();
        } else {
            $('.progress-you .bar').width(TR.progressPercent(this.valueLength));
            now.playerTextDidUpdate(now.playerId, this.value);
        };
    }, this));
    return this;
};

TR.Textbox.prototype = {
    hi: function () { console.log("HEAY")}
};

TR.progressPercent = function (textLength) {
    var val = Math.floor((textLength / TR.quote.length) * 100).toString() + "%";
    console.log(val);
    return val;
}

$(document).ready(function(e) {
    TR.prepareGame();
    TR.startGame();
});
