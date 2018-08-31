//Controller for Galactica boardgame randomizer. Responsible for setting the deck drawing
//parameters based on game settings and controlling character draft. 



//Controls the draft
define(["deck", "database"], function() {
    //Member variables
    var mPlayers = 0;
    var mPlayerCounter = 0;
    var mCylonLeadersAllowed = true;
    var mCoreExpansionAllowed = true;
    var mPegasusExpansionAllowed = true;
    var mExodusExpansionAllowed = true;
    var mDaybreakExpansionAllowed = true;
    var mExodusExpansionExtraLoyalty = true;
    var mCanRefuseCylon = true;
    var mDeck;
    var mDatabase = null;
    var mSelectedCards = new Array();
    var that = {};
    
    /**
     * Sets the extra loyalty card rule
     * @param{boolean} extraCard whether or not to add the card 
     */
    that.setExpansionExodusExtraLoyaltyCard = function(extraCard) {
        mExodusExpansionExtraLoyalty = extraCard;
    };
    
    /**
     * Sets the number of players in game 
     */
    that.setPlayers = function(players) {
        mPlayers = players;
    };
    
    /**
     * Returns the number of players 
     */
    that.getPlayers = function() {
        return mPlayers;
    };
    
    /**
     * Sets or removes Pegasus expansion from the game.
     * @param {bool} allowPegasus  
     */
    that.setExpansionPegasus = function(allowPegasus) {
        mPegasusExpansionAllowed = allowPegasus;
    };
    
    /**
     * Sets or removes Exodus expansion from the game.
     * @param {bool} allowExodus 
     */
    that.setExpansionExodus = function(allowExodus) {
        mExodusExpansionAllowed = allowExodus;
    };
    
    that.setExpansionCore = function(allowCore) {
        mCoreExpansionAllowed = allowCore;    
    };
    
    /**
     * Sets or removes Daybreak expansion from the game.
     * @param {bool} allowDaybreak 
     */
    that.setExpansionDaybreak = function(allowDaybreak) {
        mDaybreakExpansionAllowed = allowDaybreak;
    };
    
    /**
     * Sets or removes cylon leaders from the game.
     * @param {bool} allowCylons 
     */
    that.allowCylonLeaders = function(allowCylons) {
        mCylonLeadersAllowed = allowCylons;
    };
    
    /**
     * Returns array of selected characters 
     */
    that.getSelectedCards = function() {
        return mSelectedCards;    
    };
    
    /**
     * Returns if it is possible to refuse a cylon leader
     * @return {bool} mCanRefuseCylon
     */
    that.canRefuseCylonLeader = function() {
        return mCanRefuseCylon;
    };
    
    /**
     * Sets cylon leader refusal possibility
     * @param {bool} canRefuseCylon 
     */
    that.setCylonLeaderRefusal = function(canRefuseCylon) {
        mCanRefuseCylon = canRefuseCylon;
    };
    
    
    that.initDeck = function() {
        require(["database", "deck"], function(database, deck) {
           mDeck = deck;
           mDatabase = database;
           that.setDeck(database, deck);
        });
    };
    
    /**
     * Initializes deck of character cards.
     */
    that.setDeck = function(database, deck) {
        if(deck)
            mDeck = deck;
        if(database)
            mDatabase = database;
        var omitSets = new Array();
        
        if(!mCylonLeadersAllowed) {
            mDeck.removeCardTypes(["Cylon Leader"]);
        }
        if(!mCoreExpansionAllowed) {
            omitSets.push("Core");
        }
        if(!mPegasusExpansionAllowed) {
            omitSets.push("Pegasus");
        }
        if(!mExodusExpansionAllowed) {
            omitSets.push("Exodus");
        }
        if(!mDaybreakExpansionAllowed) {
            omitSets.push("Daybreak");
        }
        mDeck.removeSets(omitSets);
        mDeck.createDeck(mDatabase); 
    };
    
    /**
     * Private function for starting a character selection turn 
     */
    that.takeSelectionTurn = function(cardObject, cardArrayName) {
        var card1;
        var card2;
        var i;
        var omitList;
        if(!mDeck) {
            mDeck = require("deck");
        }
        //In 7 player game, only allow the 7th player to choose Cylon Leader if one hasn't been
        //selected.
        if(mPlayerCounter === 7) {
            mCanRefuseCylon = false;
            if(!mDeck.isTypeOmited("Cylon Leader")) {
                omitList = ["Pilot", "Political Leader", "Military Leader", "Support"];
                mDeck.removeCardTypes(omitList);
            }
        }
        card1 = mDeck.popRandomCard();
        card2 = mDeck.popRandomCard();
        cardObject[cardArrayName].push(card1);
        cardObject[cardArrayName].push(card2);
    };
    
    /**
     * Starts the game 
     */
    that.runGame = function() {
      this.setDeck();
      this.takeSelectionTurn();
      mPlayerCounter = 1;
    };
    
    /**
     * Returns the player # currently taking his turn
     * @return {integer} mPlayerCounter 
     */
    that.getCurrentPlayer = function() {
        return mPlayerCounter;
    };
    
    /**
     * Stores selected card
     * @param {galactica.card} card  
     */
    that.depositSelectedCard = function(card) {
        mDeck.removeAlternates(card.getId() );
        mSelectedCards.push(card);
    };
    
    /**
     * Checks that the character types are legal
     * Adds types to omitTypeList and once full set (pilot, mil. lead. and pol. lead.)
     * have been selected, resets the list.
     */
    that.checkForTypeValidity = function() {
        var i;
        var lastSelected = mSelectedCards[mSelectedCards.length-1];
        var pilotFound = false;
        var militaryLeaderFound = false;
        var politicalLeaderFound = false;
        var cylonLeaderFound = false;
        var lastSelectedType = lastSelected.getType(); 
        if(lastSelected.getType() === "Support") {
            return;
        }
        var omitList = mDeck.getOmitTypes();
        omitList.push(lastSelected.getType());
        for(i = 0; i < omitList.length; i++) {
                if(omitList[i] === "Military Leader") {
                    militaryLeaderFound = true;
                }
                else if(omitList[i] === "Political Leader") {
                    politicalLeaderFound = true;
                }
                else if(omitList[i] === "Pilot") {
                    pilotFound = true;
                }
                else if(omitList[i] === "Cylon Leader") {
                    cylonLeaderFound = true;
                }
        }//for
        if(militaryLeaderFound && politicalLeaderFound && pilotFound) {
            delete omitList;
            omitList = new Array();
            if(cylonLeaderFound) {
                omitList.push("Cylon Leader");
            }
        }
        mDeck.removeCardTypes(omitList);
          
    };//checkForTypeValidity
    
    /**
     * Called when character has been selected. Starts next selection turn
     * or shows selection results if the last player selected her character 
     */
    that.characterSelected = function() {
        if(mPlayerCounter < mPlayers) {
            mPlayerCounter++;
            this.checkForTypeValidity();
            this.takeSelectionTurn();
        }
        else{
            this.setTitles();
            ui.showResults();
        }
    };//characterSelected
    
    /**
    * Sets titles to cards based on admiral, CAG and president inheritancy.
    * Privately called function 
    */
    that.setTitles = function() {
        var maxPriorityAdmiral = [0,0];
        var maxPriorityCag = [0,0];
        var maxPriorityPresident = [0,0];
        var cardAdmiralInheritance = 0;
        var cardCAGInheritance = 0;
        var cardPresidentInheritance = 0;
        for(var i = 0; i < mSelectedCards.length; i++) {
            cardAdmiralInheritance = mSelectedCards[i].getAdmiralInheritance();
            cardCAGInheritance = mSelectedCards[i].getCAGInheritance();
            cardPresidentInheritance = mSelectedCards[i].getPresidentInheritance();
            if(mSelectedCards[i].getType() != "Cylon Leader") {
                if(cardAdmiralInheritance < maxPriorityAdmiral[0] || maxPriorityAdmiral[0] === 0) {
                    maxPriorityAdmiral[0] = cardAdmiralInheritance;
                    maxPriorityAdmiral[1] = i;
                }
                if( cardCAGInheritance < maxPriorityCag[0] || maxPriorityCag[0] === 0) {
                    maxPriorityCag[0] = cardCAGInheritance;
                    maxPriorityCag[1] = i;
                }
                if(cardPresidentInheritance < maxPriorityPresident[0] || maxPriorityPresident[0] === 0) {
                    maxPriorityPresident[0] = cardPresidentInheritance;
                    maxPriorityPresident[1] = i;
                }
            }
        }//for
        mSelectedCards[maxPriorityAdmiral[1]].setTitle("Admiral");
        mSelectedCards[maxPriorityCag[1]].setTitle("CAG");
        mSelectedCards[maxPriorityPresident[1]].setTitle("President");
    };
    
    /**
     * Return unselected card to the deck 
     * param {galactica.card} galactica.card object to be returned to the deck
     */
    that.returnCard = function(card) {
        mDeck.push(card);
    };
    
    /**
    * Draws cylons again
    * @param {Array.<galactica.card>} cards array
    * @return {Array.<galactica.card>} cards array containing new selection options without a Cylon Leader
    */
    that.redrawCylons = function(cards) {
        var origOmitList = mDeck.getOmitTypes();
        var i;
        var card;
        var draftedCard;
        for(i = 0; i < cards.length; i++) {
            card = cards[i];
            if(card.getType() === "Cylon Leader") {
               //Remove type "Cylon Leader" from selection
               origOmitList.push("Cylon Leader");
               mDeck.removeCardTypes(origOmitList);
               //Draw a new card that is not a Cylon Leader
               draftedCard = mDeck.popRandomCard();
               mDeck.push(card);
               cards[i] = draftedCard;
               //Add "Cylon Leader" back to be a selection option
               origOmitList = mDeck.getOmitTypes();
               origOmitList.splice(origOmitList.length-1, 1);
               mDeck.removeCardTypes(origOmitList);
            }
        }//for
        return cards;
    };//redrawCylons
    
    /**
     *Creates loyalty deck 
     */
    that.createLoyaltyDeck = function() {
        var loyaltyDeck = galactica.loyaltyDeck(mPegasusExpansionAllowed, mExodusExpansionAllowed, mExodusExpansionExtraLoyalty);
        return loyaltyDeck.buildLoyaltyDeck(mSelectedCards);
    };
    
    return that;
});//galactica.controller
