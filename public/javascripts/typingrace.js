$(document).ready(function(e) {

});

TR = {};

TR.prepareGame = function () {
    // select a sun tzu quote
    TR.quote = quotes[Math.floor(Math.random()*6)];
    // place the quote into the hidden textbox
};

TR.startGame = function () {

};

TR.Textbox = function () {
    return this;
};

TR.Textbox.prototype = {
    hi: function () { console.log("HEAY")}
};