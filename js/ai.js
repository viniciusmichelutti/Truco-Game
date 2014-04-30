var TrucoAI = {
    
    /**
     * NEEDS REFACTORY, TO BE SEPARATED IN MORE FUNCTIONS
     **/
    makeChoice: function(tableCard) {
        if (tableCard) {
            var canWin = new Array();
            $.each(TrucoAPI.computerHand, function(i, obj) {
                if (Rules.whoWin(tableCard, obj) === TrucoAPI.players.COMPUTER) {
                    canWin.push(obj);
                }
            });
            
            if (canWin.length > 0) {
                // For each card that can win, we select the lower one
                var temp = null;
                for (var x = 0; x < canWin.length; x++) {
                    if (temp == null) temp = canWin[x];
                    
                    if (Rules.whoWin(temp, canWin[x]) == TrucoAPI.players.PLAYER) {
                        temp = canWin[x];
                    }
                }
                
                return temp;
            } else {
                // If we can't win, we select the lower one from the hand
                var lower = null;
                $.each(TrucoAPI.computerHand, function(i, obj) {
                    if (lower == null) lower = obj;
                    
                    if (Rules.whoWin(lower, obj) == TrucoAPI.players.PLAYER) {
                        lower = obj;
                    }
                });
                
                return lower;
            }

        } else {
            // Play the greatest card of the hand
            var greatest = null;
            $.each(TrucoAPI.computerHand, function(i, obj) {
                if (greatest == null) greatest = obj;
                
                if (Rules.whoWin(greatest, obj) == TrucoAPI.players.COMPUTER) {
                    greatest = obj;
                }
            });
            return greatest;
        }
        
    }
    
}