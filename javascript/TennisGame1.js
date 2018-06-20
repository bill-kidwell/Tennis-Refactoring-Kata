var scores = {
    0: 'Love',
    1: 'Fifteen',
    2: 'Thirty',
    3: 'Forty'
}

var Player = function(name) {
    this.name = name;
    this.score = 0;
};

Player.prototype.wonPoint = function() {
    this.score += 1;
}

Player.prototype.compare = function(opponent) {
    return this.score - opponent.score;
}

// Return the text for the player's score, or the number if there is no name.
Player.prototype.getScore = function() {
    return scores[this.score] || this.score;
}

var TennisGame1 = function(player1Name, player2Name) {
    if (player1Name === player2Name) {
        throw new Error("Invalid game. Two distinct players requried.");
    }

    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);

    this.players = [ this.player1, this.player2 ];
};

TennisGame1.prototype.getPlayer = function(playerName) {    
    return this.players.find(function(d, i) {
        return d.name === playerName;
    });
}

TennisGame1.prototype.wonPoint = function(playerName) {
    this.getPlayer(playerName).wonPoint();
};

const reportTie = function (score) {
    if (score > 2)
        return 'Deuce';
    return scores[score] + '-All';
}

const max = function (player1, player2) {
    return player1.score > player2.score 
        ? player1
        : player2;
}

const isTied = function(player1, player2) {
    return player1.compare(player2) === 0;
}

const reportAdvantageOrWin = function(player1, player2) {    
    var score = '';
    var diff = player1.compare(player2);
    score = Math.abs(diff) > 1 ? 'Win for ' : 'Advantage ';
    score += max(player1, player2).name;
    return score;
}

const score = function (player1, player2) {
    if (isTied(player1, player2)) {
        return reportTie(player1.score);
    } 
    
    if (player1.score >= 4 || player2.score >= 4) {
        return reportAdvantageOrWin(player1, player2);
    } 
    
    return player1.getScore() + '-' + player2.getScore();
}

TennisGame1.prototype.getScore = function() {
    return score(this.player1, this.player2)
};

if (typeof window === "undefined") {
    module.exports = TennisGame1;
}