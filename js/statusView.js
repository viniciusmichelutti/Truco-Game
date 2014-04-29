var StatusView = {

    addStatus: function(msg) {
        $("#status div").append("<p>" + msg + "</p>");
        $('#status').stop().animate({scrollTop: $('#status').prop("scrollHeight")}, 'fast');
    },
    
    addSeparator: function() {
        $("#status div").append("<hr />");
        $("#status div p").addClass("old");
    },
    
    resetScore: function() {
        $(".result.computer").html("00");
        $(".result.player").html("00");
    },
    
    addScore: function(qtt, player) {
		var score = 0;
        if (player == TrucoAPI.players.COMPUTER) {
            score = parseInt($(".result.computer").html());
            $(".result.computer").html(score + qtt);
        } else if (player == TrucoAPI.players.PLAYER) {
            score = parseInt($(".result.player").html());
            $(".result.player").html(score + qtt);
        } else if (player == TrucoAPI.players.DRAW) {
        }
		
		if (score+qtt >= 12) {
			GameView.setTempMessage("O " + player + " ganhou este jogo.");
			setTimeout(this.refresh, 1200);
		}
    },
    
	refresh: function() {
		location.reload();
	},
	
    clearLog: function() {
        $("#status div").html("");   
    }
    
}