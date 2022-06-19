// all tiles

/*

[1][2][3]
[4][5][6]
[7][8][9]

*/

// winning tiles ( winning combinations)
/*

[1][2][3]
[4][5][6]
[7][8][9]
[1][4][7]
[2][5][8]
[3][6][9]
[1][5][9]
[3][5][7]

*/


// Global variables
// ======================
// Global array of winning combinations


const winningTiles = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7']
];
var x = Deez
var O = nuts
    // Global array of games the user has played
const gamesPlayedByUser = [];
// Global array of games the computer has played
const gamesPlayedByComputer = [];
// Global array of tiles available
const availableTiles = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
// User's choice of game side
const userGameSide = sessionStorage.getItem("player-choice"); // lets assume the user chose X
// Computer's choice of game side
const computerGameSide = userGameSide === "Nuts" ? "Deez" : "Nuts";



function tileClick(element, tilePosition) {
    playGame(element, tilePosition);
    var audio = new Audio("soundfile.wav");​
    document.onclick = function() {
        audio.play();
    }

}

// funtion that handles playing the game
function playGame(element, tilePosition) {
    // check if the tile has been played already
    if (element.innerText !== "") {
        // that means you've played on that tile already
        alert("You've played on that tile already!");
        return
    }
    // show the user side on the tile
    element.innerText = userGameSide;
    // add tile position to games played by user array
    gamesPlayedByUser.push(tilePosition);
    // remove tile played from available tiles
    availableTiles.splice(availableTiles.indexOf(tilePosition), 1);
    // check if player won
    if (checkWin("user")) {
        // that means user won, so alert and stop the game
        alert("YOU WIN!!!");
        return;
    }

    // check if the game is a tie
    if (availableTiles.length == 0) {
        alert("IT'S A TIE !!! Were gonna play harder");
        location.assign("index2.html")
        return;
    }

    // summon the computer AI to play after 0.5 seconds
    setTimeout(computerGamePlayAI, 500);
}

// this function check if there's a winning combination
function checkWin(player) {
    if (player === "user") {
        // check if at least 3 tiles have been played
        if (gamesPlayedByUser.length >= 3) {
            // then check the combination
            var userWon = winningTiles.some(function(ar) {
                return ar.every(function(e) {
                    return gamesPlayedByUser.indexOf(e) != -1
                })
            });

            return userWon;
        }
    } else {
        // check if at least 3 tiles have been played
        if (gamesPlayedByComputer.length >= 3) {
            // then check the combination
            var computerWon = winningTiles.some(function(ar) {
                return ar.every(function(e) {
                    return gamesPlayedByComputer.indexOf(e) != -1
                })
            });

            return computerWon;
        }
    }
}

// computer game play AI
function computerGamePlayAI() {

    let topLeftTilePosition = "1";
    let topRightTilePosition = "3";

    // generate a random number based on the number of tiles available
    let randomIndexNumber = Math.floor((Math.random() * (availableTiles.length - 1)) + 1);
    // determine tile position to play based on the random index number in the available tiles
    let tilePositionToPlay = availableTiles[randomIndexNumber];
    // add position played to computer's game played array
    gamesPlayedByComputer.push(tilePositionToPlay);
    // output tile to be played
    document.getElementById(tilePositionToPlay).innerText = computerGameSide;
    // remove tile played by computer from available tiles
    availableTiles.splice(availableTiles.indexOf(tilePositionToPlay), 1);
    // check if computer wins
    if (checkWin("computer")) {
        // computer won, so alert and stop the game
        alert("COMPUTER AI WINS THE GAME!!!");
        return;
    }

    // check if the game is a tie
    if (availableTiles.length == 0) {
        alert("IT'S A TIE !!!");
        return;
    }
}


// check if the games played by computer array contains certain tile positions.




function ToMedium() {
    location.assign("index2.html")
}