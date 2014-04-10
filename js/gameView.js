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
            html += "<div class='card card" + index + "'>";
            html += "<img src='imgs/cards/" + cards[x].suit  + "/" + cards[x].rank + ".png' />";
            html += "</div>"
        }
        container.html(html);
    },
    
    redistributeBothCards: function() {
        this.redistributeCards(TrucoAPI.players.COMPUTER, TrucoAPI.computerHand);   
        this.redistributeCards(TrucoAPI.players.PLAYER, TrucoAPI.playerHand);   
    }
    
}