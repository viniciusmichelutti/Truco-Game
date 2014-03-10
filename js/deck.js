var Deck = {

    numbers: {
        1: 3,
        2: 2,
        3: 1,
        4: "K",
        5: "J",
        6: "Q",
        7: 7,
        8: 6,
        9: 5,
        10: 4
    },
    
    suits: ["CLUBS", "HEARTS", "SPADES", "DIAMONDS"],
    
    cards: null,
    
    newDeck: function() {
        console.log("Generating a new deck with all cards");
        
        this.cards = new Array();
        for (n in this.numbers) {
            for (s in this.suits) {
                this.cards.push(new Card(this.numbers[n], this.suits[s]));
            }
        }
    },
    
    shuffle: function() {
        for (var j, x, i = this.cards.length; 
             i; 
             j = Math.floor(Math.random() * i), x = this.cards[--i], this.cards[i] = this.cards[j], this.cards[j] = x);
    },
    
    newHand: function() {
        var hand = new Array();
        
        for (var x = 1; x <= 3; x++) {
            hand.push(this.giveFirstCard());
        }
        
        return hand;
    },
    
    giveFirstCard: function() {
        var card = this.cards[0];
        this.cards.splice(0, 1);
        
        return card;
    }
    
}