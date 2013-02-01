$(document).ready(function(e) {
    TR.prepareGame();
    TR.startGame();
});

TR = {};

TR.signIn = function (name) {
    now.connectToGame();
now.gameDidEnd = function() {
  console.log("Game" + now.game.id + "Is Ending");
}

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
    return this;
};

TR.Textbox.prototype = {
    this.el.on('keydown', _.bind(function (e) {
        this.value = this.el.val();
        this.valueLength = this.value.length;
        if (TR.quote[this.valueLength - 1] !== this.value[this.valueLength - 1] ) {
            $('body').addClass('red');
            _.delay(50, function () {
                body.removeClass('red');
            });
            e.preventDefault();
        };
    }, this));
    hi: function () { console.log("HEAY")}
};
