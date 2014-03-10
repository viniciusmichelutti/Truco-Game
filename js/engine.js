var TrucoAPI = {

	init: function() {
		// binds
        this.startGame();
	},

    startGame: function() {
		// restart counter / score
		this.startHands();
	},

	startHands: function() {
		Deck.newDeck();
        Deck.shuffle();
        
        var computerHand = Deck.newHand();
        var playerHand = Deck.newHand();
	}

};

$(function() {
    TrucoAPI.init();
});