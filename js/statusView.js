var StatusView = {

    addStatus: function(msg) {
        $("#status div").append("<p>" + msg + "</p>");
        $('#status').stop().animate({scrollTop: $('#status').prop("scrollHeight")}, 'fast');
    },
    
    resetScore: function() {
        
    },
    
    addScore: function(qtt, player) {
        if (player == TrucoAPI.players.COMPUTER) {
            
        } else if (player == TrucoAPI.players.PLAYER) {
            
        } else if (player == TrucoAPI.players.DRAW) {
            
        }
    },
    
    clearLog: function() {
        $("#status div").html("");   
    }
    
}