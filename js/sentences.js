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
        "Você ganhou, não vale roubar!",
        "Ganhou! Tá usando cheater?",
        "Ganhou! Já tá apelando né?"
    ],
    
    computerWinsTheRound: [
        "Perdeu! Se continuar assim vai ser humilhação!",
        "Perdeu, vai dar ponto de graça?"
    ],
    
    playerWinsTheRound: [
        "Você venceu, mas foi sorte!"
    ],
    
    computerCallsTruco: [
        "TRUCO!!!!",
        "Truco! Vai correr?"
    ],
    
    playerCallsTruco: [
        "TRUCO!!!!"
    ],
    
    getRandomSentenceFrom: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];   
    }
    
}