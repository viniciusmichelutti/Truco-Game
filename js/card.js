function Card(rank, suit) {

    this.rank = rank;
    this.suit = suit;
    
};

Card.prototype.sayMe = function() {
    return this.rank + " de " + this.suit;
};