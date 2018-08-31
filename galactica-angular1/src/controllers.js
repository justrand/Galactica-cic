
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
