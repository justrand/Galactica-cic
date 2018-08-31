//Galactica Boardgame Assistant

goog.provide("galactica.gameInterface");

goog.require("goog.dom");

/**
 * Responsible for drawing game assistant UI (the UI that is shown after character draft) 
 */
galactica.gameInterface = function() {
  var that = {};
  var mController;
  /**
   * Sets reference to controller for game
   * @param {galactica.controller} controller reference to galactica.controller object 
   */
  that.setController = function(controller) {
      mController = controller;
  };
  
  /**
   * Creates user interface for game assistant 
   */
  that.createGameUi = function() {
      
  };
 
  
  return that;
};

