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
        this.manilha = Rules.getNextCard(this.river);
        
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
        var winner = Rules.whoWin(playerCard, computerCard);
        
        // REMOVE FROM HANDS THE CARDS
        var pIndex = this.getIndexFromArray(this.playerHand, playerCard);
        var cIndex = this.getIndexFromArray(this.computerHand, computerCard);
        this.playerHand.splice(pIndex, 1);
        this.computerHand.splice(cIndex, 1);
        
        console.log("Vitória: " + winner);
    },
    
    getKeyByValue: function(obj, value) {
        for( var prop in obj ) {
            if( obj.hasOwnProperty( prop ) ) {
                 if( obj[ prop ] === value )
                     return prop;
            }
        }
    },
    
    getIndexFromArray: function(obj, card) {
        for (var x = 0; x < obj.length; x++) {
            if (obj[x].rank == card.rank && obj[x].suit == card.suit) {
                return x;
            }
        }
    }

};

$(function() {
    TrucoAPI.init();
});