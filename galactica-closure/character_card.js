//galactica.card class
//Represents character card



/**
 * Represents a card object. Keeps record of name, type, admiral, CAG and president
 * inheritancy rank and set. Responsible for drawing itself although galactica.ui will
 * call the createDom() method of this class. 
 */
define(function() {
    var that = {};
    
    that.createCard = function() {
        var mId = 0; //Running id number. Currently not in use.
        var mName = "John Doe";
        var mType = "Pilot";
        var mAdmiralInheritance = 4;
        var mCAGInheritance = 1;
        var mPresidentInheritance = 8;
        var mSet = "Base";
        var mTitle = "";
        var mStartingLocation = "Command";
        var mOncePerTurnTitle = "Once per turn";
        var mOncePerTurnText ="Hello world!";
        var mOncePerGameTitle = "Once per game";
        var mOncePerGameText = "Hello world once!";
        var mWeaknessTitle = "Weakness";
        var mWeaknessText = "This is my weakness";
        var mAlternateOf = -1;//card id of the card that cannot be selected if this one is
        var mDraws;
        var mLoyaltyWeight = 1;
        var that = {};
        /**
         * Sets data into card
         * @param {Object} data
         */
        that.setData = function(data) {
            if(typeof(data) === "object") {
                mId = data.id;
                mName = data.name;
                mType = data.type;
                mAdmiralInheritance = data["admiralInheritance"];
                mCAGInheritance = data["cagInheritance"];
                mPresidentInheritance = data["presidentInheritance"];
                mSet = data["set"];
                mStartingLocation = data["startLocation"];
                mOncePerTurnTitle = data["oncePerTurnTitle"];
                mOncePerTurnText = data["oncePerTurnText"];
                mOncePerGameTitle = data["oncePerGameTitle"];
                mOncePerGameText = data["oncePerGameText"];
                mWeaknessTitle = data["weaknessTitle"];
                mWeaknessText = data["weaknessText"];
                mDraws = data["draws"];
                mLoyaltyWeight = data["loyaltyWeight"];
                mAlternateOf = data["alternateOf"];
            }
            else console.log("galactica.card.setData did not receive an object but something with type of "+typeof(data));
        };
        
        
        /**
         * Returns alternate id
         * @return alternate id as number 
         */
        that.getAlternateId = function() {
            return mAlternateOf;
        };
        
        /**
         * Checks if this card is alternate of the id given
         * @param{Number} cardId
         * @return true or false 
         */
        that.isAlternateOf = function(cardId) {
            if(mAlternateOf === cardId) return true;
            else return false;
        };
        
        /**
         * Returns character name
         * @return {string} mName
         */
        that.getName = function() {
          return mName;  
        };
        
        /**
         * Returns card id
         * @return {integer} mId
         */
        that.getId = function() {
            return mId;
        };
        
        /**
         * Returns character type
         * @return {string} mType
         */
        that.getType = function() {
            return mType;
        };
        
        /**
         * Returns character's admiral inheritance number
         * @return {integer} mAdmiralInheritance
         */
        that.getAdmiralInheritance = function() {
            return mAdmiralInheritance;
        };
        
        /**
         * Returns character's CAG inheritance number
         * @return {integer} mCAGInheritance
         */
        that.getCAGInheritance = function() {
            return mCAGInheritance;
        };
        
        /**
         * Returns character's president inheritance number
         * @return {integer}  mPresidentInheritance
         */
        that.getPresidentInheritance = function() {
            return mPresidentInheritance;
        };
        
        /**
         * Returns Battlestar Galactica expansion name that the character belongs to
         * @return {"Base"| "Pegasus" | "Exodus"} mSet
         */
        that.getSet = function() {
            return mSet;
        };
        
        /**
         * Set character title. If character has a title already, add new title to it.
         * @param {string} title
         */
        that.setTitle = function(title) {
            if(mTitle != "") {
                mTitle = mTitle+" "+title;
            }
            else {
                mTitle = title;
            }
        };
        
        /**
         * Returns character's title
         * @return {string} character's title 
         */
        that.getTitle = function() {
            return mTitle;
        };
        
        /**
         * Clear title 
         */
        that.clearTitle = function() {
            mTitle = "";
        };
        
        /**
         * Returns character's ability
         * @return {array.<string>} character's once per turn title and description 
         */
        that.getOncePerTurnAbility = function() {
            return [mOncePerTurnTitle, mOncePerTurnText];
        };
        
        /**
         * Returns character's once per game ability
         * @return {array.<string>} character's once per game ability title and description 
         */
        that.getOncePerGameAbility = function() {
            return [mOncePerGameTitle, mOncePerGameText];
        };
        
        /**
         * Returns character's weakness
         * @return {array.<string> character's weakness title and description} 
         */
        that.getWeakness = function() {
            return [mWeaknessTitle, mWeaknessText];  
        };
        
        /**
         * Get starting location of the character
         * @return {string} starting location of the character 
         */
        that.getStartingLocation = function() {
            return mStartingLocation;
        };
        
        /**
         * Get card drawing information
         * @return {array.<Object>} Skill Card drawing information in array of objects. Objects are in form {"sphere" : "string", "amount" : int}
         */
        that.getDraws = function() {
          return mDraws;  
        };
        
        /**
         * Returns cards loyalty weight
         * @return {Integer} character's loyalty weight 
         */
        that.getLoyaltyWeight = function() {
          return mLoyaltyWeight;  
        };
        return that;
    };
    return that;
});
