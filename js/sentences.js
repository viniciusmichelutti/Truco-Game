var Sentences = {

    computerWinsTheMove: [
        "Computador ganhou, seu pato!",
        "Computador ganhou, seu ruinzinho!",
        "Computador ganhou, essa foi fácil",
        "Computador ganhou, você é mesmo uma pessoa?",
        "Computador ganhou, você precisa de ajuda?",
        "Computador ganhou, que jogo fácil",
        "Computador ganhou, ele está jogando sem ver!"
    ],
    
    playerWinsTheMove: [
        "Você ganhou :(",
        "Você ganhou, não vale roubar!"
    ],
    
    computerWinsTheRound: [
        
    ],
    
    playerWinsTheRound: [
        
    ],
    
    computerCallsTruco: [
        
    ],
    
    playerCallsTruco: [
        
    ],
    
    getRandomSentenceFrom: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];   
    }
    
}