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
