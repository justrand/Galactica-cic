requirejs.config({
    
    baseUrl: '',
    
    paths: {
        card: "character_card",
        database: "character_card_db",
        draftController: "controller",
        deck: "character_deck"
    }
    
});


require(["controller"], function() {
        
});
