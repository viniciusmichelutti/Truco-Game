var TrucoAPI = {

    round: [],
    river: null,
    computerHand: null,
    playerHand: null,
    manilha: null,
    pcLastCard: null,
	showPCCard: false,

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
        
        $(document).on("click", "#playerHand .card", function(e){
            var index = $.data(e.currentTarget, "index");
            var card = _this.playerHand[index];
            _this.playCard(card);
        });
		
		$(document).on("click", "#computerHand .card", function(e){
			_this.showPCCard = !_this.showPCCard;
			GameView.redistributeCards(TrucoAPI.players.COMPUTER, TrucoAPI.computerHand);
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
        
        $("#manilha .horizontalCard").html("<img src='imgs/cards/" + this.river.suit  + "/" + this.river.rank + ".png' />")
        
        GameView.redistributeBothCards();
        
        console.log("Computer cards:");
        console.log(this.computerHand);
        
        console.log("Player cards:");
        console.log(this.playerHand);
        
        console.log("Manilha:");
        console.log(this.manilha);
	},

    playCard: function(playerCard) {
        StatusView.addStatus("Jogador jogou a carta " + playerCard.sayMe());
        
        var computerCard = null;
        if (this.pcLastCard != null) {
            computerCard = this.pcLastCard;
        } else {
            // LETS THE COMPUTER THINK AND MAKE A CHOICE OF PLAY
            computerCard = TrucoAI.makeChoice(playerCard);
            StatusView.addStatus("Computador responde a jogada com a carta " + computerCard.sayMe());
        }
        
        // WHO WONS? PLAYER OR COMPUTER?
        var winner = Rules.whoWin(playerCard, computerCard);
        
        // REMOVE FROM HANDS THE CARDS
        var pIndex = this.getIndexFromArray(this.playerHand, playerCard);
        this.playerHand.splice(pIndex, 1);
        
        if (this.pcLastCard == null) {
            var cIndex = this.getIndexFromArray(this.computerHand, computerCard);
            this.computerHand.splice(cIndex, 1);
        }
        
        GameView.playedCards(playerCard, computerCard, this.round.length + 1);
        GameView.redistributeBothCards();
        
        this.round.push(winner);
        if (winner != this.players.DRAW) {
            StatusView.addStatus("O " + winner + " ganhou essa rodada.");
        }
              
        var roundWinner = Rules.whoWinsTheRound(this.round);
        if (roundWinner) {
			GameView.showRoundWinner(roundWinner); // Show message in the screen
			
			StatusView.addStatus(roundWinner + " ganhou este round.");
            StatusView.addScore(1, roundWinner); // TODO e se estiver trucado?
			
            GameView.resetPlayedCards();
            this.startHands();
        }
        
        this.pcLastCard = null;
        if (winner == this.players.COMPUTER) {
            this.computerPlay();
        }
    },
    
    computerPlay: function() {
        // LETS THE COMPUTER THINK AND MAKE A CHOICE OF PLAY
        var computerCard = TrucoAI.makeChoice();
        this.pcLastCard = computerCard;
        StatusView.addStatus("Computador joga a carta " + computerCard.sayMe());
        
        var cIndex = this.getIndexFromArray(this.computerHand, computerCard);
        this.computerHand.splice(cIndex, 1);
        
        GameView.playedCards(undefined, computerCard, this.round.length + 1);
        GameView.redistributeCards(TrucoAPI.players.COMPUTER, TrucoAPI.computerHand);   
        
        StatusView.addStatus("Esperando a sua jogada...");
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