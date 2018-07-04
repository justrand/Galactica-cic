//Represents deck of Galactica boardgame character cards



angular.module( "galactica.deck", ["galactica.card"])
.provider("galacticaDeckService", function() {
    var mDeck = null;
    var mOmitSetList = null;
    var mOmitTypes = null;
    var that = {};
    
    var config = {
        mDeck: new Array(),
        mOmitSetList: new Array(),
        mOmitTypes: new Array()
    };
    
    /**
     * Returns the number of cards in deck
     * @return {int} 
     */
    that.deckSize = function() {
        return mDeck.length;
    };
    
    /**
     * Removes alternate cards from the deck
     * @param{Number} cardId 
     */
    that.removeAlternates = function(cardId) {
        if(cardId === -1) return -1;
        for(var i = 0; i < mDeck.length; i++) {
            var card = mDeck[i];
            if(card.isAlternateOf(cardId)) {
                if(i < mDeck.length-1) {
                    var subdeck = mDeck.slice(i+1, mDeck.length);
                    mDeck.splice(i, (mDeck.length-i));
                    mDeck = mDeck.concat(subdeck);
                    return;
                }
                else {
                    card = that.pop();
                    return;
                }
            }//if card.isAlternateOf
        }//for
    };
    
    /**
    * Returns a reference to a galactica.card object in position index. Doesn't remove card from deck
    * @param {number} index card index in deck
    * @return {galactica.card} galactica.card object in the index or undefined
    */
    that.getCard = function(index) {
      if(index < mDeck.length) {
          return mDeck[index];
      }
      else return undefined;
    };
    
    /**
    * Removes and returns the last card in the deck
    * @return {galactica.card}
    */
    that.pop = function() {
        return mDeck.splice(mDeck.length-1, 1)[0];    
    };
    
    /**
     * Returns omit types array
     * @return {Array.<string>}
     */
    that.getOmitTypes = function() {
      return mOmitTypes;  
    };
    
    /**
     * Returns whether a type is omited or not
     * @param {string} type the type that is omitted
     * @return {bool} whether the type is omitted
     */
    that.isTypeOmited = function(type) {
        for(var i = 0; i < mOmitTypes.length; i++) {
            if(mOmitTypes[i] === type) {
                return true;
            }
        }
        return false;
    };
    
    /**
     * Adds a galactica.card object to the end of the deck
     * @param {galactica.card} data. galactica.card object 
     */
    that.push = function(data) {
        mDeck.splice(mDeck.length, 0, data);
        return mDeck.length;    
    };
    
    /**
     * Creates the deck. Data is deckdata defined in galactica.characterDb
     * @param {galactica.characterDb} data galactica.characterDb object
     */
    that.createDeck = function(data) {
        var omitFound = false;
        var subDeck;
       
        require(["card"], function(cardFactory) {
            for(var i = 0; i < data.length; i++) {
                //console.log("Creating deck "+i);
                var entry = cardFactory.createCard();
                entry.setData(data[i]);
                for(var j = 0; j < mOmitSetList.length; j++) {
                    if(entry.getSet() === mOmitSetList[j]) {
                        omitFound = true;
                    }
                }
                if(!omitFound) {
                    that.push(entry);
                }
                else {
                    omitFound = false;
                }
            }//for
        });//require
        
    };//createDeck
    
    /** 
     * Removes sets defined in data. This method must be called before
     * createDeck is called.
     * @param {Array.<string>} data set names in an array e.g. ["Pegasus", "Exodus"]
     */
    that.removeSets = function(data) {
        mOmitSetList = data;
    };
    
    /**
     * Removes card types from selection. 
    * @param {Array.<string>} type names in an array e.g ["Political Leader", "Pilot"]
     */
    that.removeCardTypes = function(data) {
        mOmitTypes = data;
    };
    
    /**
     * Removes random card from the deck. Returns galactica.card object
     * @return {Object.<galactica.card>}
     */
    that.popRandomCard = function() {
        //Generate a random number between 0 and number of character cards
        var cardIndex = Math.floor((Math.random()*mDeck.length));
        var entry = mDeck[cardIndex];
        //Check if the card is not allowed
        if(mOmitTypes != undefined) {
            for(var i = 0; i < mOmitTypes.length; i++) {
                if(mOmitTypes[i] === entry.getType() ) {
                    return that.popRandomCard();
                }
            }
        }
        if(cardIndex < mDeck.length-1) {
            subdeck = mDeck.slice(cardIndex+1, mDeck.length);
            mDeck.splice(cardIndex, (mDeck.length-cardIndex));
            mDeck = mDeck.concat(subdeck);
            return entry;
        }
        else {
            return that.pop();
        }
    };//getRandomCard
    
    return {
        $get: function(cardFactory)  {
            that.setCardFactory(cardFactory);
            return that;
        }  
    };
});
