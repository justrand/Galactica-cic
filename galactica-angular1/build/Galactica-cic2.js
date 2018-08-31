var galacticaApp = angular.module('galacticaApp', ["ngRoute", "cic2Controllers"]);

galacticaApp.config([
    "$routeProvider",
    function($routeProvider) {
        $routeProvider.when("/characters", {
           templateUrl:"characterList.html",
           controller: "CharacterListController" 
        }).
        when("/characters/:id", {
            templateUrl: "characterDetail.html",
            controller: "CharacterDetailController"
        }).
        when("/mainmenu", {
            templateUrl: "mainmenu.html",
            controller: "MainMenuController"
        }).
        when("/draftsetup", {
            templateUrl: "draft.html",
            controller: "DraftSetupController"
        }).
        when("/draft", {
            templateUrl: "draftCharacters.html",
            controller: "DraftController"
        }).
        when("/game", {
            templateUrl: "game.html",
            controller: "GameController"
        }).
        otherwise({
            redirectTo: "/characters"
        });
    }
]);


var cic2Controllers = angular.module("cic2Controllers", []);

cic2Controllers.controller('CharacterListController', ["$scope", "characterDataService", function($scope, characterDataService) { 
    characterDataService.getCharacters(function(data) {
        $scope.characters = data;    
    });
    $scope.predicate = "id";
}]);

cic2Controllers.controller("CharacterDetailController", ["$scope", "$routeParams", "characterDataService", function($scope, $routeParams, characterDataService) {
    $scope.id = $routeParams.id;
    $scope.alternateExists = false;
    $scope.isCylonLeader = false;
    $scope.characters = undefined;
    
    characterDataService.getCharacters(function(data){
        $scope.character = data[$routeParams.id];
        $scope.characters = data;
        if($scope.character.alternateOf != -1) {
              $scope.alternateExists = true;
        }
        if($scope.character.type === "Cylon Leader") $scope.isCylonLeader = true;
    });
}]);


cic2Controllers.controller("MainMenuController", ["$scope", function($scope) {
    
}]);

cic2Controllers.controller("DraftSetupController", ["$scope", "draftDeck", "$location", function($scope, draftDeck, $location) {
    $scope.hasData = false;
    $scope.draftSetupBase = true;
    $scope.draftSetupPegasus = true;
    $scope.draftSetupExodus = true;
    $scope.draftSetupDaybreak = true;
    $scope.draftSetupCylonLeaders = true;
    $scope.draftSetupRefuseCylonLeader = true;
    $scope.draftSetupPlayers = 5;
    $scope.draftSetupDone = false;
    $scope.show7thPlayer = true;
    
    var checkPlayerAndExpansionLegality = function() {
        if ($scope.draftSetupPlayers === "7") {
            if((!$scope.draftSetupPegasus && !$scope.draftSetupDaybreak) || !$scope.draftSetupCylonLeaders) {
                $scope.draftSetupPlayers = "6";
            } 
        }
        
        if(!$scope.draftSetupPegasus && !$scope.draftSetupDaybreak) $scope.draftSetupCylonLeaders = false;
        if((!$scope.draftSetupPegasus && !$scope.draftSetupDaybreak) || !$scope.draftSetupCylonLeaders) $scope.show7thPlayer = false;
        else $scope.show7thPlayer = true;
        
    };
    
    //Watchers
    $scope.$watch("draftSetupPlayers", function(newValue, oldValue) {
        checkPlayerAndExpansionLegality();
    });
    
    $scope.$watch("draftSetupPegasus", function(newValue, oldValue) {
        checkPlayerAndExpansionLegality();
    });
    
    $scope.$watch("draftSetupDaybreak", function(newValue, oldValue) {
       checkPlayerAndExpansionLegality(); 
    });
    $scope.$watch("draftSetupCylonLeaders", function(newValue, oldValue) {
       checkPlayerAndExpansionLegality(); 
    });
    
    $scope.submitDraft = function() {
        $scope.draftSetupDone = true;
        draftDeck.setExpansion("Base", $scope.draftSetupBase);
        draftDeck.setExpansion("Pegasus", $scope.draftSetupPegasus);
        draftDeck.setExpansion("Exodus", $scope.draftSetupExodus);
        draftDeck.setExpansion("Daybreak", $scope.draftSetupDaybreak);
        draftDeck.setAllowCylonLeaders($scope.draftSetupCylonLeaders);
        draftDeck.setAllowRefuseCylonLeader($scope.draftSetupRefuseCylonLeader);
        draftDeck.setPlayerAmount($scope.draftSetupPlayers);
        console.log("Draft submitted "+$scope.draftSetupDone);
        draftDeck.createCharacterSet();
        $location.path("/draft");
       
    };
    
    
}]);

cic2Controllers.controller("DraftController", ["$scope", "draftDeck", "$location", function($scope, draftDeck, $location) {
    $scope.isReady = draftDeck.isReady();
    
    
    
    $scope.characters = draftDeck.selectableCharacters();
    $scope.isCylonLeaderPresent = false;
    $scope.selectedCharacters = draftDeck.selectedCharacters();
    
    $scope.$watch("isReady", function(newValue, oldValue) {
        if($scope.isReady === false) $location.path("/draftsetup");
    });
    
    $scope.$watch("characters", function(newValue, oldValue) {
        if(!$scope.characters) return;
        if(($scope.characters[0]["type"] === "Cylon Leader" || $scope.characters[1]["type"] === "Cylon Leader") && draftDeck.canRefuseCylonLeader()) $scope.isCylonLeaderPresent = true;
        else $scope.isCylonLeaderPresent = false;
    });
    
    $scope.$watch("selectedCharacters", function(newValue, oldValue) {
        for(var i = 0; i < $scope.selectedCharacters.length; i++) {
           
        }
    });
    
    $scope.selectCharacter = function(characterId, index) {
        //console.log("Character "+characterId+" selected.");
        draftDeck.selectCharacter(index);
        $scope.characters = draftDeck.selectableCharacters();
        $scope.selectedCharacters = draftDeck.selectedCharacters();
        if(!draftDeck.canRefuseCylonLeader()) $scope.isCylonLeaderPresent = false;
        if(draftDeck.isDraftFinished() ) $location.path("/game");
    };
    
    $scope.redrawCylons = function() {
        $scope.characters = draftDeck.redrawCylons($scope.characters);
        $scope.isCylonLeaderPresent  = false;
    };
    
    $scope.checkCharacterTitle = function(title, deck, index) {
        
        var highestPriority = 100;
        if(deck === 'draft') {
            if($scope.characters[index]["type"] === "Cylon Leader") return false;
        }
        else if(deck === 'selected') {
            if($scope.selectedCharacters[index]["type"] === "Cylon Leader") return false;
        }
        
        var checkTitleHelper = function(character, title) {
            var inheritance = 0;
            if(title === "president") {
               inheritance = character["presidentInheritance"];
            }
            else if(title === "admiral") {
               inheritance = character["admiralInheritance"];
            }
            else if(title === "cag") {
               inheritance = character["cagInheritance"];
            }
            return inheritance;
        };
        
        if($scope.selectedCharacters) {
            for(var i = 0; i < $scope.selectedCharacters.length; i++) {
                var priority = checkTitleHelper($scope.selectedCharacters[i], title);
                if(priority < highestPriority) highestPriority = priority;
            }//for
        }//selectedCharacters
        else return true;
        
        
        if(deck === 'draft') {
            if(checkTitleHelper($scope.characters[index], title) < highestPriority) return true;
            else return false;
        }
        else if(deck === 'selected') {
            if(checkTitleHelper($scope.selectedCharacters[index], title) < highestPriority) return true;
            else return false;
        }
    };
}]);


cic2Controllers.controller("GameController", ["$scope", "draftDeck", "$location", function($scope, draftDeck, $location) {
    $scope.characters = draftDeck.selectedCharacters();
    $scope.predicate = "id";
}]);



cic2Controllers.factory("characterDataService",["$http", function($http){
    
    var characterDataServiceFactory = {};
    
    characterDataServiceFactory.characterData = null;
        
    characterDataServiceFactory.getCharacters = function(callback) {
        if(characterDataServiceFactory.characterData === null) {
            $http.get("characterData.json").success(function(data){
                    characterDataServiceFactory.characterData = data;
                    callback(data);
            });
        }
        else callback(characterDataServiceFactory.characterData);  
    };
    
    characterDataServiceFactory.getCharacterByIndex = function(index) {
        if(!characterDataServiceFactory.characterData) return null;
        
        if(index < 0 || index >= characterDataServiceFactory.characterData.length) return null;
        return characterDataServiceFactory.characterData[index];
    };
    
    characterDataServiceFactory.getCharacterAmount = function() {
      if(!characterDataServiceFactory.characterData) return null;
      else return characterDataServiceFactory.characterData.length;  
    };
    return characterDataServiceFactory;
    
}]);
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