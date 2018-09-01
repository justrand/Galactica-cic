module.exports = (function() {
    var fullData = require("./characterData.js");
    var that = {};
    
    var activeData = fullData.concat([]);

    that.setDeckData = function(newData) {
        if(newData) {
            activeData = newData;
        }
        return activeData;  
    };

    that.deck = function() {
        return activeData;
    };
    
    that.resetData = function() {
        activeData = fullData.concat([]);
    };

    that.fullData = function() {
        return fullData.concat([]);
    };

    that.filterDeck = function(filterType, filterList, dataSet) {
        var filterListLength = filterList.length;
        if(dataSet === undefined) dataSet = activeData;
        var checkFilter = function(character) {
            for(var i = 0; i < filterListLength; i++) {
                if(filterList[i] === character[filterType]) return true;
            }
            return false;
        };
        return activeData.filter(checkFilter);
    };

    that.filterDeckByExpansion = function(filterList) {
        return that.filterDeck("set", filterList);
    };

    that.filterDeckByType = function(includedTypes) {
        return that.filterList("type", includedTypes);
    };

    that.randomSelection = function(number) {
        
        var selectedPool = [];
        var dataSet = activeData.concat([]);
        for(var i = 0; i < number; i ++) {
            var randomIndex = Math.floor(Math.random()*dataSet.length);
            //console.log("removing index "+randomIndex+" from set of "+dataSet.length);
            var character = dataSet.splice(randomIndex,1);
            selectedPool.push(character[0]);
        }
        return {
            "selection" : selectedPool,
            "deck" : dataSet
        };
    };

    return that;
})();