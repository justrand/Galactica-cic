
//Redux
//import {createStore} from 'redux';

var characterDeck = require("./characterDeck.js");


window.store = require("redux").createStore(require("./reducer.js"));
//Vue After this
var Vue = require("vue");
var VueResource = require('vue-resource');
Vue.use(VueResource);



window.onload = function() {
    require('./vueCharacterCard.js');
    
    var app = new Vue({
        el: '#galactica-app',
        data: {
            deck: characterDeck.deck()
        },
        methods: {
            drawRandom: function() {
                this.deck = characterDeck.randomSelection(5).selection;
            }
        }
    });
    
    console.log(app);
};