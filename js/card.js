function Card(rank, suit) {

    this.rank = rank;
    this.suit = suit;
    
};

Card.prototype.sayMe = function() {
    console.log("I'm a " + this.rank + " of " + this.suit);
};