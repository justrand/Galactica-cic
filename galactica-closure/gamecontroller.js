//Database of the character cards in Battlestar Galactica Boardgame including
//both expansions.

goog.provide("galactica.gameController");

/**
 * Returns game controller object
 * @param {galactica.character_deck} deck galactica.character_deck object
 * @param {Array} gameCharacters selected characters
 * @param {Object} ui user interface class that handles the during game ui 
 * @return {galactica.gameController} galactica.gameController object 
 */
galactica.gameController = function(deck, gameCharacters, ui) {
    var that = {};
    
    var mDeck = deck;
    var mGameCharacters = gameCharacters;
    var mUi = ui;
    
    
    
    
    return that;
};
