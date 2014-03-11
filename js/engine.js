var TrucoAPI = {

    round: [],
    river: null,
    computerHand: null,
    playerHand: null,
    manilha: null,

    players: {
        COMPUTER: "Computador",
        PLAYER: "Jogador",
        DRAW: "Empate"
    },

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

        this.round = [];
        this.computerHand = Deck.newHand();
        this.playerHand = Deck.newHand();
        this.river = Deck.giveFirstCard();
        this.manilha = Roles.getNextCard(this.river);
        
        console.log("Computer cards:");
        console.log(this.computerHand);
        
        console.log("Player cards:");
        console.log(this.playerHand);
        
        console.log("Manilha:");
        console.log(this.manilha);
	},

    playCard: function(playerCard) {
        // LETS THE COMPUTER THINK AND MAKE A CHOICE OF PLAY
        var computerCard = TrucoAI.makeChoice(playerCard);
        
        // WHO WONS? PLAYER OR COMPUTER?
        var winner = Roles.whoWin(playerCard, computerCard);
        
        // REMOVE FROM HANDS THE CARDS
        this.playerHand.splice(playerCard, 1);
        this.computerHand.splice(computerCard, 1);
        
        console.log(winner + " ganhou!");
    },
    
    getKeyByValue: function(obj, value) {
        for( var prop in obj ) {
            if( obj.hasOwnProperty( prop ) ) {
                 if( obj[ prop ] === value )
                     return prop;
            }
        }
    }

};

$(function() {
    TrucoAPI.init();
});