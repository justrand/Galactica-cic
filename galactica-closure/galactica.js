//Main script file for galactica randomizer
goog.provide("galactica.start");
goog.provide("galactica.ui");

goog.require("goog.dom");
goog.require("goog.events");
goog.require("goog.ui.Zippy");
goog.require("goog.ui.Checkbox");

goog.require("galactica.controller");
goog.require("galactica.deck");

/**
 * Responsible for drawing ui and providing control. Has reference to galactica.controller 
 */
galactica.ui = function() {
    var mStartButton;
    var mController;
    var mPegasusCheckbox = null;
    var mExodusCheckbox = null;
    var mCylonCheckbox = null;
    var mCylonLeaderRefuseCheckbox = null;
    var mExodusExtraCheckbox = null;
    var mDaybreakCheckbox = null;
    var mCards = new Array();
    var that = {};
    
    
    /**
     * Returns object with checkbox references 
     */
    that.getSetupUIComponent = function() {
        return {
            pegasusCheckbox: mPegasusCheckbox,
            exodusCheckbox: mExodusCheckbox,
            cylonCheckbox: mCylonCheckbox,
            cylonLeaderRefuseCheckbox: mCylonLeaderRefuseCheckbox,
            exodusExtraCheckbox: mExodusExtraCheckbox,
            daybreakCheckbox: mDaybreakCheckbox
        };
    };
    
    /**
     * Builds the setup draft UI 
     */
    that.createSetupUi = function() {
            mStartButton = goog.dom.createDom('input', {'type': 'button', 'value': 'Draw characters'}, '');
            goog.dom.appendChild(goog.dom.getElement("setupContainer"), mStartButton);
            goog.events.listen(mStartButton, goog.events.EventType.CLICK, this.startGame, false, this);
            var selectedCardsElement = goog.dom.getElement("selectedCards");
            selectedCardsElement.style.display = "none";
            
            mPegasusCheckbox = new goog.ui.Checkbox();
            mPegasusCheckbox.decorate(goog.dom.getElement("setupExpansionPegasus"));
            mPegasusCheckbox.setEnabled(true);
            mPegasusCheckbox.setChecked(true);
            goog.events.listen(mPegasusCheckbox, goog.ui.Component.EventType.CHANGE, that.handlePegasusCheckbox, false, this);
            
            mCylonCheckbox = new goog.ui.Checkbox();
            mCylonCheckbox.decorate(goog.dom.getElement("setupEnableCylonLeaders"));
            mCylonCheckbox.setEnabled(true);
            mCylonCheckbox.setChecked(true);
            goog.events.listen(mCylonCheckbox, goog.ui.Component.EventType.CHANGE, that.handleCylonCheckbox, false, this);
            
            mCylonLeaderRefuseCheckbox = new goog.ui.Checkbox();
            mCylonLeaderRefuseCheckbox.decorate(goog.dom.getElement("setupAllowPlayersRefuseCylon"));
            mCylonLeaderRefuseCheckbox.setEnabled(true);
            mCylonLeaderRefuseCheckbox.setChecked(true);
            
            mExodusCheckbox = new goog.ui.Checkbox();
            mExodusCheckbox.decorate(goog.dom.getElement("setupExpansionExodus"));
            mExodusCheckbox.setEnabled(true);
            mExodusCheckbox.setChecked(true);
            goog.events.listen(mExodusCheckbox, goog.ui.Component.EventType.CHANGE, that.handleExodusCheckbox, false, this);
            
            mExodusExtraCheckbox = new goog.ui.Checkbox();
            mExodusExtraCheckbox.decorate(goog.dom.getElement("setupExpansionExodusExtra"));
            mExodusExtraCheckbox.setEnabled(true);
            mExodusExtraCheckbox.setChecked(true);
            
            mDaybreakCheckbox = new goog.ui.Checkbox();
            mDaybreakCheckbox.decorate(goog.dom.getElement("setupExpansionDaybreak"));
            mDaybreakCheckbox.setEnabled(true);
            mDaybreakCheckbox.setChecked(true);
            goog.events.listen(mDaybreakCheckbox, goog.ui.Component.EventType.CHANGE, that.handleDaybreakCheckbox, false, this);
            
    };
    
   /**
    * Returns the "Draw characters" button element 
    */
    that.getSetupUiButton = function() {
         return mStartButton;  
    };
    
   /**
    * Shows the setup ui 
    */
   that.showSetupUi = function() {
     var container = goog.dom.getElement("setupContainer");
     container.style.display = "block";
     var selectedCardsElement = goog.dom.getElement("selectedCards");
     selectedCardsElement.style.display = "none";
   };
      
   /**
    * Hides the setup ui 
    */
   that.hideSetupUi = function() {
     var container = goog.dom.getElement("setupContainer");
     container.style.display = "none";
     var selectedCardsElement = goog.dom.getElement("selectedCards");
     selectedCardsElement.style.display = "block";  
   };
   
   /**
    * Called when "Draw characters" button is pressed. Creates and setups galactica.controller to control
    * the draft. 
    * @param {Object} e google.event
    */
   that.startGame = function(e) {
        var i;
        var setupPlayersValue = 0;          
        mController = galactica.controller(this);
        var elements = goog.dom.getElementsByClass("setupPlayers");
        for(i = 0; i < elements.length; i++) {
            if(elements[i].checked === true) {
                setupPlayersValue = elements[i].value;
                break;
            }
        }
        this.hideSetupUi();
        //Setup controller
        mController.setPlayers(setupPlayersValue);
        mController.setExpansionExodus(mExodusCheckbox.isChecked() );
        mController.setExpansionPegasus(mPegasusCheckbox.isChecked() );
        mController.setExpansionDaybreak(mDaybreakCheckbox.isChecked() );
        mController.allowCylonLeaders(mCylonCheckbox.isChecked() );
        mController.setCylonLeaderRefusal(mCylonLeaderRefuseCheckbox.isChecked() );
        mController.setExpansionExodusExtraLoyaltyCard(mExodusExtraCheckbox.isChecked() );
        mController.runGame();
   };
   
   /**
    * Returns reference to controller
    * @return {galactica.controller} mController 
    */
   that.getController = function() {
       return mController;
   };
   
   /**
    * Displays a single card that's been given reference. 
    * @param {galactica.card} card
    */ 
   that.displayCard = function(card) {
       var cardElement = goog.dom.getElement("cards");
       var button = that.drawFullCard(card, cardElement, true);
       var refuseCylonButton;
       if(mCards.length === 0) {
           mCards.push(card);
           goog.events.listen(button, goog.events.EventType.CLICK, this.character1Selected, false, this);
       }
       else if(mCards.length === 1) {
           mCards.push(card);
           goog.events.listen(button, goog.events.EventType.CLICK, this.character2Selected, false, this);
           if(mController.canRefuseCylonLeader() && (mCards[0].getType() === "Cylon Leader" || mCards[1].getType() === "Cylon Leader")) {
               refuseCylonButton = goog.dom.createDom('input', {'type': 'button', 'value': 'I don\'t want to be a Cylon Leader'}, '');
               goog.dom.appendChild(cardElement, refuseCylonButton);
               goog.events.listen(refuseCylonButton, goog.events.EventType.CLICK, this.handleRefuseCylonButton, false, this);
           }
       }
       else {
           delete mCards;
           mCards = new Array();
           this.displayCard(card);
       }
       
   };//displayCard
   
   /**
    * Private function that is called when one of the two cards is selected. Gives selected and rejected
    * cards back to controller.  
    * @param {integer} index
    */ 
   that.characterSelectedPrivate = function(index) {
       if(index > 1) {
           return;
       } 
       var cardsElement = goog.dom.getElement("cards");
       var selectedCardsElement = goog.dom.getElement("selectedCards");
       var labelElement = goog.dom.createDom("div", {"class": "character"}, "Player "+mController.getCurrentPlayer());
       cardsElement.innerHTML = "";
       goog.dom.appendChild(selectedCardsElement, labelElement);
       that.drawFullCard(mCards[index], selectedCardsElement, false);
       mController.depositSelectedCard(mCards[index]);
       if(index === 0) {
           mController.returnCard(mCards[1]);
       }
       else {
           mController.returnCard(mCards[0]);
       }
       delete mCards;
       mCards  = new Array();
       mController.characterSelected();
   };
   
   /**
    * Listener function for card1
    * @param {Object} e goog.event
    */
   that.character1Selected = function(e) {
       this.characterSelectedPrivate(0);
   };
   
   /**
    * Listener function for card2 
    * @param {Object} e goog.event
    */
   that.character2Selected = function(e) {
       this.characterSelectedPrivate(1);
   };
   
   /**
    * Shows selected characters and character titles. 
    */
   that.showResults = function() {
       var cards = mController.getSelectedCards();
       var i;
       var restartButton;
       var selectedCardsElement = goog.dom.getElement("selectedCards");
       selectedCardsElement.innerHTML = "";
       var labelElement;
       var loyaltyDeck = mController.createLoyaltyDeck();
       that.drawLoyaltyDeck(loyaltyDeck, selectedCardsElement);
       for(i = 0; i < cards.length; i++) {
            var labelElement = goog.dom.createDom("div", {"class": "player-label"}, "Player "+(i+1));
            goog.dom.appendChild(selectedCardsElement, labelElement);
            that.drawFullCard(cards[i], selectedCards, false);
            //cards[i].createDom(selectedCardsElement, false);
       }
       restartButton = goog.dom.createDom('input', {'type': 'button', 'value': 'Restart draft'}, '');
       goog.dom.appendChild(selectedCardsElement, restartButton);
       goog.events.listen(restartButton, goog.events.EventType.CLICK, this.restart, false, this);
   };
   
   /**
    * Returns to the setup screen and deletes controller. 
    * @param {Object} e. goog.event
    */
   that.restart = function(e) {
       delete mController;
       var selectedCardsElement = goog.dom.getElement("selectedCards");
       selectedCardsElement.innerHTML = "";
       this.showSetupUi();
   };
   
   /**
    * Draws new cards that are not cylons. Used in a game with "Allow Players to Refuse Cylon Leader"
    * option checked. 
    * @param {Object} e goog.event
    */
   that.handleRefuseCylonButton = function(e) {
       var cardsElement = goog.dom.getElement("cards");
       cardsElement.innerHTML = "";
       var cards = mController.redrawCylons(mCards);
       delete mCards;
       mCards = new Array();
       this.displayCard(cards[0]);
       this.displayCard(cards[1]);
   };
   
   
    /**
    * Private helper method to get css class for card type
    * @param {string} type card type 
    * @return {string} css class of the character type
    */
    that.getCardStyleClass = function(type) {
       var cardStyle;
       
       //Check card style and assign appropriate style. Styles are defined in the css file
       if(type === "Pilot") {
            cardStyle = "cardPilot";
       }
       else if(type === "Support") {
            cardStyle = "cardSupport";
       }
       else if(type === "Military Leader") {
            cardStyle = "cardMilitary";
       }
       else if(type === "Cylon Leader") {
            cardStyle = "cardCylon";
       }
       else if(type === "Political Leader") {
            cardStyle = "cardPolitical";
       }
       else {
            cardStyle = "cardEmpty";
       }
       return cardStyle;
   };//getStyleClass
   
   /**
   * Returns correct css style class based on Skill Card sphere
   * @param {string} drawType : the sphere of the Skill Card the character draws
   * @return {string} css class name of the Skill Card sphere  
   */
   that.getCardStyleDrawType = function(drawType) {
        var style;
        if(drawType === "Politics") style = "drawPolitics";
        else if(drawType === "Leadership") style = "drawLeadership";
        else if(drawType === "Tactics") style = "drawTactics";
        else if(drawType === "Piloting") style = "drawPiloting";
        else if(drawType === "Engineering") style = "drawEngineering";
        else if(drawType === "Treachery") style = "drawTreachery";
        else if(drawType === "Leadership/Engineering") style ="drawLeadershipEngineering";
        else if(drawType === "Leadership/Politics") style = "drawLeadershipPolitics";
        else if(drawType === "Tactics/Leadership") style = "drawTacticsLeadership";
        else if(drawType === "Treachery/Engineering") style = "drawTreacheryEngineering";
        else if(drawType === "Tactics/Piloting") style = "drawTacticsPiloting";
        else if(drawType === "Treachery/Tactics") style = "drawTreacheryTactics";
        else if(drawType === "Politics/Tactics") style = "drawPoliticsTactics";
        else style = "drawUnknownType";
        return style;
   };
       
   that.makeCardAbilityElements = function(cardAbility) {
       
       var title = goog.dom.createDom("span", {"class" : "cardAbilityTitle"},cardAbility[0]);
       var text = goog.dom.createDom("span", {"class" : "cardAbilityText"}, " - "+cardAbility[1]);
       var element = goog.dom.createDom("div", null, title, text);
       return element;     
   };
   
   /**
    * Generates an element with character card draws
    * @param {array.<object>} skillPool consisting of objects with sphere and amount properties
    * @return {HTMLElement} html element object 
    */
   that.makeCardDrawElement = function(skillPool)  {
       var i;
       var containerElement;
       var element;
       containerElement = goog.dom.createDom("div", {"class" : "cardDrawContainer"}, "");
       for(i = 0; i < skillPool.length; i++) {
           element = goog.dom.createDom("div", {"class" : that.getCardStyleDrawType(skillPool[i].sphere)}, skillPool[i].amount+" "+skillPool[i].sphere);
           goog.dom.appendChild(containerElement, element);
       }
       return containerElement;
   };
   
   /**
    * Draws loyalty deck
    * @param {Object} loyalties drawn loyalties
    * @param {Object} drawElement element on which to draw the elements 
    */
   that.drawLoyaltyDeck = function(loyalties, drawElement) {
       var  container = goog.dom.createDom("div", {"class" : "octagon"}, "");
       var totalNumberOfCards = loyalties.notACylon+loyalties.cylon;
       var total = goog.dom.createDom("div", {"class" : "galacticaPadding10"}, "Total cards: "+totalNumberOfCards);
       var notACylonCards = goog.dom.createDom("div", {"class" : "galacticaPadding10"}, loyalties.notACylon+" Not A Cylon cards");
       var cylonCards = goog.dom.createDom("div", {"class" : "galacticaPadding10"}, loyalties.cylon+" Cylon cards");
       var extraText = goog.dom.createDom("div", {"class" : "galacticaPadding10"}, loyalties.cylonLeaderAgenda);
       goog.dom.appendChild(container, total);
       goog.dom.appendChild(container, notACylonCards);
       goog.dom.appendChild(container, cylonCards);
       goog.dom.appendChild(container, extraText);
       goog.dom.appendChild(drawElement, container);
   };
   
   /**
    * Draws a single card. Card drawing function has been removed from galactica.card
    * @param {galactica.card} card object
    * @param {HTMLElement} drawElement to what element draw the card
    * @param {bool} drawSelectButton 
    */
   that.drawFullCard = function(card, drawElement, drawSelectButton) {
       if(drawSelectButton === undefined) {
           drawSelectButton = false;
       }
       var buttonElement;
       var selectButton;
       var cardContainer = goog.dom.createDom("div", {"class" : "cardContainer octagon"} , "");
       var characterTitleElement = goog.dom.createDom("span", {"class" : "character"}, card.getName() );
       var typeElement = goog.dom.createDom("span", {"class" : that.getCardStyleClass(card.getType() ) }, card.getType() );
       var titleContainer = goog.dom.createDom("div", {"class" : "cardName cardTitleContainer"}, characterTitleElement, typeElement);
       if(drawSelectButton) {
            selectButton = goog.dom.createDom('input', {'type': 'button', 'value': 'Select'}, '');
            buttonElement = goog.dom.createDom('span', null, selectButton);
            goog.dom.appendChild(titleContainer, buttonElement);
       }
       if(card.getTitle() != "") {
            var titleElement = goog.dom.createDom("span", {'class' : 'character'}, "  "+card.getTitle());
            goog.dom.appendChild(titleContainer, titleElement);
       }
       var locationContainer = goog.dom.createDom("div", {"class" : "cardLocation"}, "Setup: "+card.getStartingLocation() );
       var cardContext = goog.dom.createDom("div", null, "");
       //Create ability box
       var abilityContainer = goog.dom.createDom("div", {"class" : "cardAbilityContainer"}, "");
       var temp = card.getOncePerTurnAbility();
       var oncePerTurnElement = that.makeCardAbilityElements(temp);
       temp = card.getOncePerGameAbility();
       var oncePerGameElement = that.makeCardAbilityElements(temp);
       temp = card.getWeakness();
       var weaknessElement = that.makeCardAbilityElements(temp);
       goog.dom.appendChild(abilityContainer, oncePerTurnElement);
       goog.dom.appendChild(abilityContainer, oncePerGameElement);
       goog.dom.appendChild(abilityContainer, weaknessElement);
       
       var skillElement = that.makeCardDrawElement(card.getDraws());
       
       
       goog.dom.appendChild(cardContainer, titleContainer);
       
       
       goog.dom.appendChild(cardContext, skillElement);
       goog.dom.appendChild(cardContext, abilityContainer);
       goog.dom.appendChild(cardContext, locationContainer);
       
       goog.dom.appendChild(cardContainer, cardContext);
       
       //Add finished card into the HTML
       goog.dom.appendChild(drawElement, cardContainer);
       
      var zip = new goog.ui.Zippy(characterTitleElement, cardContext);
      return buttonElement;
   };//that.drawFullCard()
   
   
       /**
     * Handler for Pegasus Expansion checkbox. Sets cylon leader checkbox to disabled if Pegasus
     * checkbox is unchecked. Also removes check from cylon leader checkbox in case the Pegasus checkbox
     * is unchecked. 
     */
     that.handlePegasusCheckbox = function() {
         
        if(mPegasusCheckbox.isChecked()) {
            if(!mCylonCheckbox.isEnabled() ) {
                mCylonCheckbox.setEnabled(true);
                mCylonLeaderRefuseCheckbox.setEnabled(true);
            }
            galactica.disable7PlayerAvailability(false);
        }
        else {
            if(mCylonCheckbox.isChecked() ) {
                mCylonCheckbox.setChecked(false);
                mCylonLeaderRefuseCheckbox.setChecked(false);
            }
            if(mCylonLeaderRefuseCheckbox.isEnabled() ) {
                mCylonCheckbox.setEnabled(false);
                mCylonLeaderRefuseCheckbox.setEnabled(false);
            }
            galactica.disable7PlayerAvailability(true);
        }
    };//that.handlePegasusCheckbox
   
    /**
     * Handler for Exodus Expansion checkbox. Disables extra card option if the expansion is disabled 
     */
    that.handleExodusCheckbox = function() {
        if(mExodusCheckbox.isChecked() ) {
            mExodusExtraCheckbox.setEnabled(true);
        }
        else {
            if(mExodusExtraCheckbox.isChecked() ) {
                mExodusExtraCheckbox.setChecked(false);
            }
            if(mExodusExtraCheckbox.isEnabled() ) {
                mExodusExtraCheckbox.setEnabled(false);
            }
        }
    };
    
    /**
     * Handler for Daybreak Expansion checkbox.
     */
    that.handleDaybreakCheckbox = function() {

    };

    /**
     * Handler for Cylon Leader checkbox. Unchecks and disables "Allow players to refuse Cylon Leader"
     * checkbox if Cylon Leader checkbox is unchecked. Enables "Allow players to refuse Cylon Leader"
     * checkbox if Cylon Leader checkbox is checked. 
     */
    that.handleCylonCheckbox = function() {
        if(mCylonCheckbox.isChecked() ) {
            if(!mCylonLeaderRefuseCheckbox.isEnabled() ) {
                mCylonLeaderRefuseCheckbox.setEnabled(true);
            }
            galactica.disable7PlayerAvailability(false);
        }
        else {
            if(mCylonLeaderRefuseCheckbox.isChecked() ) {
                mCylonLeaderRefuseCheckbox.setChecked(false);
            }
            if(mCylonLeaderRefuseCheckbox.isEnabled() ) {
                mCylonLeaderRefuseCheckbox.setEnabled(false);
            }
            galactica.disable7PlayerAvailability(true);
        }
    };

   return that;
};//galactica.ui

/**
 * Start function for starting the program 
 */
galactica.start = function() {
    var galUi = galactica.ui();
    galUi.createSetupUi();
};//galactica.start









/**
 * Changes the 7 player radio button disabled or enabled based on Cylon leader checkbox state
 * @param {bool} isDisabled whether to disable or enable the checkbox 
 */
galactica.disable7PlayerAvailability = function(isDisabled) {
    var value7Box = 7;
    var value6Box = 6;
    var value6Element;
    var i;
    
    var checkboxElements = goog.dom.getElementsByClass("setupPlayers");
    for(i = 0; i < checkboxElements.length; i++) {
        if(parseInt(checkboxElements[i].value) === value6Box) {
            value6Element = checkboxElements[i];
        }
        else if(parseInt(checkboxElements[i].value) === value7Box) {
            checkboxElements[i].disabled = isDisabled;
            if(checkboxElements[i].disabled === true && checkboxElements[i].checked === true) {
                value6Element.checked = true;
            }
            return;
        }//else if
    }//for
};

// Ensures the symbol will be visible after compiler renaming.
goog.exportSymbol('galactica.start', galactica.start);
goog.exportSymbol('galactica.handlePegasusCheckbox', galactica.handlePegasusCheckbox);
goog.exportSymbol('galactica.handleExodusCheckbox', galactica.handleExodusCheckbox);
