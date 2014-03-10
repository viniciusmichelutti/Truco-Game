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
        var manilha = Deck.giveFirstCard();
        
        console.log("Computer cards:");
        console.log(computerHand);
        
        console.log("Player cards:");
        console.log(playerHand);
        
        console.log("Manilha:");
        console.log(manilha);
	}

};

$(function() {
    TrucoAPI.init();
});