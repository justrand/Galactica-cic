//Loyalty deck

goog.provide("galactica.loyaltyDeck");

/**
 * Returns loyaltydeck object
 * @param{Boolean} isPegaus whether or not Pegasus expansion is in the game
 * @param{Boolean} isExodus whether or not  Exodus expansion is in the game
 * @param{Boolean} isExodusExtra whether to add one extra "not a Cylon" card into the deck
 * @return {Object} galactica.loyaltyDeck object 
 */
galactica.loyaltyDeck = function(isPegasus, isExodus, isExodusExtra) {
    var that = {};
    var mIsPegasus = isPegasus;
    var mIsExodus = isExodus;
    var mIsExodusExtra = isExodusExtra;
    
    /**
     * Builds the loyalty deck and returns its composition 
     * @param {Object} selectedCharacters
     * @return {Object} composition of the draft
     */
    that.buildLoyaltyDeck = function(selectedCharacters) {
        var amountOfCharacters = selectedCharacters.length;
        var totalCards = amountOfCharacters;
        var cylonLeader = false;
        for(var i = 0; i < amountOfCharacters; i++ ) {
            var currentCard = selectedCharacters[i];
            if(currentCard.getType() === "Cylon Leader") {
                totalCards--;
                cylonLeader = true;
            } 
            else {
                totalCards += currentCard.getLoyaltyWeight();
            }
            
        }
        
        //If playing with Exodus expansion, add an extra loyalty card into the deck
        if(mIsExodus && mIsExodusExtra) {
            totalCards++;
        }
        
        var cylonCards = 0;
        var notACylonCards = totalCards;
        var addSympathizer = false;
        var cylonLeaderAgendaText = "";
        
        if(amountOfCharacters === 3) {
            cylonCards = 1;
        }
        else if(amountOfCharacters === 4) {
            cylonCards = 1;
            if(!cylonLeader) {
                addSympathizer = true;
            }
            else {
               cylonLeaderAgendaText = "Deal one random Sympathetic Agenda Card to the Cylon Leader"; 
            }
        }
        else if(amountOfCharacters === 5) {
            cylonCards = 2;
            if(cylonLeader) {
                cylonCards--;
                cylonLeaderAgendaText = "Deal one random Hostile Agenda Card to the Cylon Leader";
            }
        }
        else if(amountOfCharacters === 6) {
            cylonCards = 2;
            if(!cylonLeader) {
                addSympathizer = true;
            }
            else {
                cylonLeaderAgendaText = "Deal one random Sympathetic Agenda Card to the Cylon Leader";
            }
        }
        else if(amountOfCharacters === 7 && cylonLeader) {
            cylonCards = 2;
            if(cylonLeader) {
                cylonLeaderAgendaText = "Deal one random Hostile Agenda Card to the Cylon Leader";
            }
        }
        notACylonCards -= cylonCards;
        
        if(addSympathizer) {
            cylonLeaderAgendaText = "Add one Sympathizer card to the deck.";
        }
        return {
          notACylon: notACylonCards,
          cylon: cylonCards,
          cylonLeaderAgenda: cylonLeaderAgendaText
        };
    };
    return that; 
};
