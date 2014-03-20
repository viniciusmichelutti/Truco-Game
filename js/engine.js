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
        var _this = this;
		$("#startGame").on("click", function(e) {
            GameView.hideMessageOverlay();
            _this.startGame();
        });
	},

    startGame: function() {
		StatusView.resetScore();
        StatusView.clearLog();
        StatusView.addStatus("Iniciando novo jogo, sente-se confiante?");
		this.startHands();
	},

	startHands: function() {
        if (this.round.length > 0) {
            StatusView.addSeparator();
        }
        
        StatusView.addStatus("Embaralhando cartas...")
		Deck.newDeck();
        Deck.shuffle();

        StatusView.addStatus("Distribuindo cartas para ambos os jogadores.")
        this.round = [];
        this.computerHand = Deck.newHand();
        this.playerHand = Deck.newHand();
        this.river = Deck.giveFirstCard();
        this.manilha = Rules.getNextCard(this.river);
        StatusView.addStatus("Virou a carta: " + this.river.sayMe());
        
        console.log("Computer cards:");
        console.log(this.computerHand);
        
        console.log("Player cards:");
        console.log(this.playerHand);
        
        console.log("Manilha:");
        console.log(this.manilha);
	},

    playCard: function(playerCard) {
        StatusView.addStatus("Jogador jogou a carta " + playerCard.sayMe());
        
        // LETS THE COMPUTER THINK AND MAKE A CHOICE OF PLAY
        var computerCard = TrucoAI.makeChoice(playerCard);
        StatusView.addStatus("Computador responde a jogada com a carta " + computerCard.sayMe());
        
        // WHO WONS? PLAYER OR COMPUTER?
        var winner = Rules.whoWin(playerCard, computerCard);
        
        // REMOVE FROM HANDS THE CARDS
        var pIndex = this.getIndexFromArray(this.playerHand, playerCard);
        var cIndex = this.getIndexFromArray(this.computerHand, computerCard);
        this.playerHand.splice(pIndex, 1);
        this.computerHand.splice(cIndex, 1);
        
        this.round.push(winner);
        if (winner != this.players.DRAW) {
            StatusView.addStatus("O " + winner + " ganhou essa rodada.");
        }
        
        if (winner == this.players.COMPUTER) {
            var msg = Sentences.getRandomSentenceFrom(Sentences.computerWinsTheMove);
            GameView.setTempMessage(msg);
        } else if (winner == this.players.PLAYER) {
            var msg = Sentences.getRandomSentenceFrom(Sentences.playerWinsTheMove);
            GameView.setTempMessage(msg);
        } else {
            GameView.setTempMessage("Empate!");
            StatusView.addStatus("Empate!");
        }
        
        if (this.round.length == 3) {
            console.log("Vitórias: " + this.round);
            console.log("\n\n");
            var player = Rules.whoWinTheRound(this.round);
            StatusView.addScore(1, player); // TODO e se estiver trucado?
            this.startHands();
        }
    },
    
    getKeyByValue: function(obj, value) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                 if (obj[prop] === value)
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