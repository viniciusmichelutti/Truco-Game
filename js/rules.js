var Rules = {

    whoWinsTheRound: function(round) {
        var playerCount = 0;
        var computerCount = 0;
        $.each(round, function(i, o) {
            if (o === TrucoAPI.players.COMPUTER) {
                computerCount++;   
            } else if (o === TrucoAPI.players.PLAYER) {
                playerCount++;   
            }
        });
        
        if (playerCount >= 2) return TrucoAPI.players.PLAYER;
        if (computerCount >= 2) return TrucoAPI.players.COMPUTER;
        
        if (round.length == 3) {
            if (round[0] != TrucoAPI.players.DRAW) {
                return round[0];
            } else if (round[1] != TrucoAPI.players.DRAW) {
                return round[1];
            } else {
                return round[2];   
            }
        }
        
        return undefined;
    },
    
    /**
     * Who wins the hand?
     * @return TrucoAPI.players object
     */
    whoWin: function(playerCard, computerCard) {
        
        var playerManilha = this.isItManilha(playerCard);
        var computerManilha = this.isItManilha(computerCard);
        if (playerManilha && computerManilha) {
            return this.whichSuitWins(playerCard, computerCard);   
        } else if (playerManilha) {
            return TrucoAPI.players.PLAYER;
        } else if (computerManilha) {
            return TrucoAPI.players.COMPUTER;
        }
        
        return this.whichRankWins(playerCard, computerCard);
    },
    
    /**
     * Verify if the card is manilha
     */
    isItManilha: function(card) {
        if (card.rank == TrucoAPI.manilha) {
            return true;
        }
        
        return false;
    },
    
    /**
     * Compare two suits of cards
     */
    whichSuitWins: function(playerCard, computerCard) {
        var playerSuit = this.getSuitNumber(playerCard.suit);
        var computerSuit = this.getSuitNumber(computerCard.suit);
        
        if (playerSuit < computerSuit) {
            return TrucoAPI.players.COMPUTER;
        } else if (playerSuit > computerSuit) {
            return TrucoAPI.players.PLAYER;
        }
        
        return TrucoAPI.players.DRAW;
    },
    
    getSuitNumber: function(suit) {
        var number = 1;
        if (suit == Deck.suits[0]) {
            number = 4;
        } else if (suit == Deck.suits[1]) {
            number = 3;
        } else if (suit == Deck.suits[2]) {
            number = 2;
        }
        
        return number;
    },
    
    /*
     * Compare two ranks of cards
     */
    whichRankWins: function(playerCard, computerCard) {
        if (playerCard.rank == computerCard.rank) {
            return TrucoAPI.players.DRAW;   
        }
        
        var pKey = TrucoAPI.getKeyByValue(Deck.numbers, playerCard.rank);
        var cKey = TrucoAPI.getKeyByValue(Deck.numbers, computerCard.rank);
        
        if (parseInt(pKey) < parseInt(cKey)) {
            return TrucoAPI.players.PLAYER;   
        }
        
        return TrucoAPI.players.COMPUTER;
    },
    
    getNextCard: function(card) {
        var index = TrucoAPI.getKeyByValue(Deck.numbers, card.rank);
        if (index == 1) return Deck.numbers[10];
        
        return Deck.numbers[index - 1];
    }

}