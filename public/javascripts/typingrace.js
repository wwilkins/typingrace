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
    this.el.on('keydown', _.bind(function (e) {
        this.value = this.el.val();
        this.valueLength = this.value.length;
        console.log('keycode ' + e.keyCode);
        console.log('should be ' + TR.quote[this.valueLength].charCodeAt());
        if (TR.quote[this.valueLength].charCodeAt() !== e.keyCode && e.keyCode !== 8 ) {
            $('body').addClass('red');
            _.delay(function () {
                $('body').removeClass('red');
            }, 50);
            e.preventDefault();
        };
    }, this));
    return this;
};

TR.Textbox.prototype = {
    hi: function () { console.log("HEAY")}
};
