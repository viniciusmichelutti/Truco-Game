var GameView = {
    
    hideMessageOverlay: function() {
        $("#gameWarnings").fadeOut('fast');
        $(".overlay").fadeOut('fast');   
    },
    
    setTempMessage: function(msg, temp) {
        $("#gameWarnings").html(msg);
        if (temp == undefined) temp = 1200;
        
        $("#gameWarnings").fadeIn('fast');
        $(".overlay").fadeIn('fast');   
        
        setTimeout(this.hideMessageOverlay, temp);
    },
    
    redistributeCards: function(player, cards) {
        var container = $("#computerHand");
        if (player === TrucoAPI.players.PLAYER) {
            container = $("#playerHand");
        }
        
        var html = "";
        for (var x = 0; x < cards.length; x++) {
            var index = x+1;
            
			if (player === TrucoAPI.players.PLAYER || TrucoAPI.showPCCard) {
				html += this.mountCardImage(index, cards[x]);
			} else {
				html += this.mountBackCardImage(index, cards[x]);
			}
        }
        container.html(html);
        
        $.each($(container).find(".card"), function(i, o) {
            $.data(o, "index", i); 
        });
    },
    
    mountCardImage: function(index, card) {
        var html = "<div class='card card" + index + "'>";
        html += "<img src='imgs/cards/" + card.suit  + "/" + card.rank + ".png' />";
        html += "</div>"
        
        return html;
    },
    
	mountBackCardImage: function(index, card) {
        var html = "<div class='card card" + index + "'>";
        html += "<img src='imgs/cards/back.jpg' />";
        html += "</div>"
        
        return html;
    },
	
    redistributeBothCards: function() {
        this.redistributeCards(TrucoAPI.players.COMPUTER, TrucoAPI.computerHand);   
        this.redistributeCards(TrucoAPI.players.PLAYER, TrucoAPI.playerHand);   
    },
    
    playedCards: function(playerCard, computerCard, round) {
        if (playerCard != undefined) {
            $("#playedCards .playedRound" + round).append(this.mountCardImage(round, playerCard));
        }
        $("#playedCards .playedRound" + round).append(this.mountCardImage(round, computerCard));
    },
    
    resetPlayedCards: function() {
        for (var x = 1; x <=3; x++) {
            $("#playedCards .playedRound" + x).html("");
        }
    },
	
	showRoundWinner: function(roundWinner) {
		if (roundWinner == TrucoAPI.players.COMPUTER) {
			var msg = Sentences.getRandomSentenceFrom(Sentences.computerWinsTheMove);
			GameView.setTempMessage(msg);
		} else if (roundWinner == TrucoAPI.players.PLAYER) {
			var msg = Sentences.getRandomSentenceFrom(Sentences.playerWinsTheMove);
			GameView.setTempMessage(msg);
		} else {
			GameView.setTempMessage("Empate!");
			StatusView.addStatus("Empate!");
		}
	}
    
}