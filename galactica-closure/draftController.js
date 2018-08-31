angular.module('galacticaCIC', [])
.controller('DraftController', ['$scope',
    function draftSetupController($scope) {
        $scope.cards = new Array();
        $scope.draftSetup = {};
        galacticaCIC = {};
        
        
        $scope.draftSetup.characterSet = {
            "Core": true,
            "Pegasus": true,
            "Exodus" : true,
            "Daybreak" : true
        };
        
        $scope.draftSetup.ruleSet = {
            "CylonLeaders" : true,
            "RefuseCylonLeader" : true,
            "ExtraLoyaltyCard" : true  
        };
        $scope.draftSetup.playerAmount = "5";
        $scope.cards = [];
        $scope.layoutUrl = "cardlayout.html";
        
        $scope.startDraft = function(draftSetup) {
            $scope.draftStarted = true;
            galacticaCIC.galacticaController = require("controller");
            
            galacticaCIC.galacticaController.setExpansionCore($scope.draftSetup.characterSet.Core);
            galacticaCIC.galacticaController.setExpansionPegasus($scope.draftSetup.characterSet.Pegasus);
            galacticaCIC.galacticaController.setExpansionExodus($scope.draftSetup.characterSet.Exodus);
            galacticaCIC.galacticaController.setExpansionDaybreak($scope.draftSetup.characterSet.Daybreak);
            
            var players = parseInt($scope.draftSetup.playerAmount);
            galacticaCIC.galacticaController.setPlayers(players);
            galacticaCIC.galacticaController.initDeck();
           
            
            galacticaCIC.galacticaController.takeSelectionTurn($scope, "cards");
            
        };
}]);

