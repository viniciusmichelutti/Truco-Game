var StatusView = {

    addStatus: function(msg) {
        $("#status div").append("<p>" + msg + "</p>");
        $('#status').stop().animate({scrollTop: $('#status').prop("scrollHeight")}, 'fast');
    }
    
}