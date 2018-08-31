

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