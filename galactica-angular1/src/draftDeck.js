cic2Controllers.factory("draftDeck", ["characterDataService", function(characterDataService){
    var draftDeckFactory = {};
    var characterData = null;
    var characterSets = new Array();
    var allowCylonLeaders = false;
    var allowRefuseCylonLeaders = false;
    var players = 5;
    var omitTypes = new Array();
    var ready = false;
    var selectableCharacters = undefined;
    var selectedCharacters = new Array();
    var playerCounter = 0;
    var draftFinished = false;
    
    draftDeckFactory.setExpansion = function(name, isInGame) {
       for(var i = 0; i < characterSets.length; i++) {
           if(characterSets[i]["expansion"] === name) {
               characterSets[i]["isInGame"] = isInGame;
               return;
           }
       }
       characterSets.push({
          "expansion": name,
          "isInGame" : isInGame
       });
    };
    
    draftDeckFactory.setAllowCylonLeaders = function(allowLeaders) {
        allowCylonLeaders = allowLeaders;
    };
    
    draftDeckFactory.setAllowRefuseCylonLeader = function(allowRefuse) {
        allowRefuseCylonLeaders = allowRefuse;  
    };
    
    draftDeckFactory.canRefuseCylonLeader = function() {
        return allowRefuseCylonLeaders;  
    };
    
    draftDeckFactory.setPlayerAmount = function(amount) {
        players = parseInt(amount);  
    };
    
    draftDeckFactory.canRefuseCylonLeader = function() {
        return allowRefuseCylonLeaders;  
    };
    
    var setSelectedCharactersTitles = function() {
        var maxPriorityAdmiral = [0,0];
        var maxPriorityCag = [0,0];
        var maxPriorityPresident = [0,0];
        var cardAdmiralInheritance = 0;
        var cardCAGInheritance = 0;
        var cardPresidentInheritance = 0;
        for(var i = 0; i < selectedCharacters.length; i++) {
            cardAdmiralInheritance = selectedCharacters[i]["admiralInheritance"];
            cardCAGInheritance = selectedCharacters[i]["cagInheritance"];
            cardPresidentInheritance = selectedCharacters[i]["presidentInheritance"];
            if(selectedCharacters["type"] !== "Cylon Leader") {
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
        
        for(var j = 0; j < selectedCharacters.length; j++) {
            if(j === maxPriorityAdmiral[1]) selectedCharacters[j]["isAdmiral"] = true;
            else selectedCharacters[j]["isAdmiral"] = false;
            
            if(j === maxPriorityCag[1]) selectedCharacters[j]["isCag"] = true;
            else selectedCharacters[j]["isCag"] = false;
            
            if(j === maxPriorityPresident[1]) selectedCharacters[j]["isPresident"] = true;
            else selectedCharacters[j]["isPresident"] = false;
        }
     };
    
    var startDraft = function() {
        characterData = new Array();
        var characterAmount = characterDataService.getCharacterAmount();
        for(var i = 0; i < characterAmount; i++) {
            for(var j = 0; j < characterSets.length; j++) {
                //console.log(draftDeckFactory.characterData[i]["set"]+" "+characterSets[j]["expansion"]);
                var character = characterDataService.getCharacterByIndex(i);
                if(character["set"] === characterSets[j]["expansion"] && characterSets[j]["isInGame"] === true) {
                    if((character["type"] === "Cylon Leader" && allowCylonLeaders) || character["type"] !== "Cylon Leader"){
                        console.log("Character added: "+character["name"]);   
                        characterData.push(character);
                    }
                }
            }//for j
        }//for i
        ready = true;
        draftDeckFactory.takeSelectionTurn();
        console.log("Characters in game: "+characterData.length+". Players: "+players);
        
        
    };
    
    draftDeckFactory.isReady = function() {
        return ready;
    };
    
    draftDeckFactory.createCharacterSet = function() {
        if(characterData) {
            while(characterData.length > 0) {
                characterData.pop();
            }
        }
        characterDataService.getCharacters(function(data){
            startDraft();
        });
        
    };
    
    draftDeckFactory.pop = function() {
        return characterData.splice(characterData.length-1, 1)[0];    
    };
    
    draftDeckFactory.popRandomCard = function() {
        //Generate a random number between 0 and number of character cards
        var cardIndex = Math.floor((Math.random()*characterData.length));
        var entry = characterData[cardIndex];
        //Check if the card is not allowed
        if(omitTypes != undefined) {
            for(var i = 0; i < omitTypes.length; i++) {
                if(omitTypes[i] === entry["type"] ) {
                    return draftDeckFactory.popRandomCard();
                }
            }
        }
        if(cardIndex < characterData.length-1) {
            subdeck = characterData.slice(cardIndex+1, characterData.length);
            characterData.splice(cardIndex, (characterData.length-cardIndex));
            characterData = characterData.concat(subdeck);
            return entry;
        }
        else {
            return draftDeckFactory.pop();
        }
    };//getRandomCard
    
    draftDeckFactory.takeSelectionTurn = function() {
        //In 7 player game, only allow the 7th player to choose Cylon Leader if one hasn't been
        //selected.
        if(playerCounter === 6) {
            allowRefuseCylonLeaders = false;
            if(!draftDeckFactory.isTypeOmited("Cylon Leader")) {
                omitTypes = ["Pilot", "Political Leader", "Military Leader", "Support"];
                
            }
        }
        selectableCharacters = [draftDeckFactory.popRandomCard(), draftDeckFactory.popRandomCard()];
    };
    
    draftDeckFactory.isTypeOmited = function(type) {
        var i;
        if(omitTypes) {
            for(i = 0; i < omitTypes.length; i++) {
                if(omitTypes[i] === type) {
                    return true;
                }
            }
        }
        return false;
    };
    
    draftDeckFactory.checkForTypeValidity = function() {
        var i;
        var lastSelected = selectedCharacters[selectedCharacters.length-1];
        var pilotFound = false;
        var militaryLeaderFound = false;
        var politicalLeaderFound = false;
        var cylonLeaderFound = false;
        var lastSelectedType = lastSelected["type"]; 
        if(lastSelectedType === "Support") {
            return;
        }
        if(!omitTypes) omitTypes = new Array();
        omitTypes.push(lastSelectedType);
        for(i = 0; i < omitTypes.length; i++) {
                if(omitTypes[i] === "Military Leader") {
                    militaryLeaderFound = true;
                }
                else if(omitTypes[i] === "Political Leader") {
                    politicalLeaderFound = true;
                }
                else if(omitTypes[i] === "Pilot") {
                    pilotFound = true;
                }
                else if(omitTypes[i] === "Cylon Leader") {
                    cylonLeaderFound = true;
                }
        }//for
        if(militaryLeaderFound && politicalLeaderFound && pilotFound) {
            while(omitTypes.length > 0) {
                omitTypes.pop();
            }
            if(cylonLeaderFound) {
                omitTypes.push("Cylon Leader");
            }
        }
    };//checkForTypeValidity
    
    draftDeckFactory.selectCharacter = function(index) {
        if(playerCounter < players) {
            playerCounter++;
            var selectedCharacter = undefined;
            var returnCharacter = undefined;
            if(index === 0) {
                returnCharacter = selectableCharacters.pop();
                selectedCharacter = selectableCharacters.pop();
            }
            else {
                selectedCharacter = selectableCharacters.pop();
                returnCharacter = selectableCharacters.pop();
            }
            characterData.push(returnCharacter);
            selectedCharacters.push(selectedCharacter);
            draftDeckFactory.checkForTypeValidity();
            setSelectedCharactersTitles();
            draftDeckFactory.removeAlternates(selectedCharacter["id"]);
            if(playerCounter < players) draftDeckFactory.takeSelectionTurn();
            else draftFinished = true;
        }
        else{
          draftFinished = true;
        }
    };//characterSelected
    
    
    draftDeckFactory.isDraftFinished = function() {
        return draftFinished;
    };
    
    draftDeckFactory.removeAlternates = function(cardId) {
        if(cardId === -1) return;
        for(var i = 0; i < characterData.length; i++) {
            var card = characterData[i];
            if(card["alternateOf"] === cardId) {
                if(i < characterData.length-1) {
                    var subdeck = characterData.slice(i+1, characterData.length);
                    characterData.splice(i, (characterData.length-i));
                    characterData = characterData.concat(subdeck);
                    return;
                }
                else {
                    card = draftDeckFactory.pop();
                    return;
                }
            }//if card.isAlternateOf
        }//for
    };
    
    draftDeckFactory.redrawCylons = function(cards) {
        var i;
        var card;
        var draftedCard;
        for(i = 0; i < cards.length; i++) {
            card = cards[i];
            if(card["type"] === "Cylon Leader") {
               //Remove type "Cylon Leader" from selection
               omitTypes.push("Cylon Leader");
               //Draw a new card that is not a Cylon Leader
               draftedCard = draftDeckFactory.popRandomCard();
               characterData.push(card);
               cards[i] = draftedCard;
               //Add "Cylon Leader" back to be a selection option
               omitTypes.splice(omitTypes.length-1, 1);
            }
        }//for
        return cards;
    };//redrawCylons
    
    draftDeckFactory.selectableCharacters = function() {
        return selectableCharacters;
    };
    
    draftDeckFactory.selectedCharacters = function() {
        return selectedCharacters;  
    };
    return draftDeckFactory;
}]);