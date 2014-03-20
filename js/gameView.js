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
    }
    
}