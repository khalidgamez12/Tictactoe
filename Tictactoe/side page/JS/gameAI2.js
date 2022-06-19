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
// Global array of games the user has played
const gamesPlayedByUser = [];
// Global array of games the computer has played
const gamesPlayedByComputer = [];
// Global array of tiles available
const availableTiles = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
// User's choice of game side
const userGameSide = sessionStorage.getItem("player-choice"); // lets assume the user chose X
// Computer's choice of game side
const computerGameSide = userGameSide === "X" ? "O" : "X";

function tileClick(element, tilePosition) {
    playGame(element, tilePosition);
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
        alert("IT'S A TIE !!!");
        return;
    }

    // summon the computer AI to play after 0.5 seconds
    //setTimeout(computerGamePlayAIEasyMode, 500);
    setTimeout(computerGamePlayAIMediumMode, 500);
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
function computerGamePlayAIEasyMode() {
    // generate a random number based on the number of tiles available
    let randomIndexNumber = Math.floor((Math.random() * (availableTiles.length - 1)) + 1);
    // determine tile position to play based on the random index number in the available tiles
    let tilePositionToPlay = availableTiles[randomIndexNumber];
    // add postion played to computer's game played array
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
        alert("IT'S A TIE !!! Were gonna play harder");
        location.assign("index3.html")
        return;
    }
}

// computer game play AI (hard mode)
function computerGamePlayAIMediumMode() {
    // tile variables
    let middleTilePosition = "5";
    let topLeftTilePosition = "1";
    let topRightTilePosition = "3";
    let bottomLeftTilePosition = "7";
    let bottomRightTilePosition = "9";
    let middleTile = document.getElementById(middleTilePosition);
    let topLeftTile = document.getElementById(topLeftTilePosition);
    let topRightTile = document.getElementById(topRightTilePosition);
    let bottomLeftTile = document.getElementById(bottomLeftTilePosition);
    let bottomRightTile = document.getElementById(bottomRightTilePosition);
    // variable to hold the tile position to play
    let tilePositionToTargetAndPlay = "";


    // if the computer has taken two edges already and the tile inbetween
    // is empty, the computer should attempt to take the empty tile inbetween.
    // check if the games played by computer array contains certain tile positions.
    if (gamesPlayedByComputer.includes(topLeftTilePosition) && gamesPlayedByComputer.includes(topRightTilePosition)) {
        // check if the tile inbetween them is empty
        if (document.getElementById("2").innerText === "") {
            // play this tile
            tilePositionToTargetAndPlay = "2";
            // add postion played to computer's game played array
            gamesPlayedByComputer.push(tilePositionToTargetAndPlay);
            // output tile to be played
            document.getElementById(tilePositionToTargetAndPlay).innerText = computerGameSide;
            // remove tile played by computer from available tiles
            availableTiles.splice(availableTiles.indexOf(tilePositionToTargetAndPlay), 1);
            // check if computer wins
            if (checkWin("computer")) {
                // computer won, so alert and stop the game
                alert("COMPUTER AI WINS THE GAME!!!");
                return;
            }

            // check if the game is a tie
            if (availableTiles.length == 0) {
                alert("IT'S A TIE !!!");
                location.assign("index3.html")
                return;
            }

            return;

        }
    }

    // check for bottom left and bottom right
    if (gamesPlayedByComputer.includes(bottomLeftTilePosition) && gamesPlayedByComputer.includes(bottomRightTilePosition)) {
        // check if the tile inbetween them is empty
        if (document.getElementById("8").innerText === "") {
            // play this tile
            tilePositionToTargetAndPlay = "8";
            // add postion played to computer's game played array
            gamesPlayedByComputer.push(tilePositionToTargetAndPlay);
            // output tile to be played
            document.getElementById(tilePositionToTargetAndPlay).innerText = computerGameSide;
            // remove tile played by computer from available tiles
            availableTiles.splice(availableTiles.indexOf(tilePositionToTargetAndPlay), 1);
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

            return;

        }
    }

    // check for top left and bottom left
    if (gamesPlayedByComputer.includes(topLeftTilePosition) && gamesPlayedByComputer.includes(bottomLeftTilePosition)) {
        // check if the tile inbetween them is empty
        if (document.getElementById("4").innerText === "") {
            // play this tile
            tilePositionToTargetAndPlay = "4";
            // add postion played to computer's game played array
            gamesPlayedByComputer.push(tilePositionToTargetAndPlay);
            // output tile to be played
            document.getElementById(tilePositionToTargetAndPlay).innerText = computerGameSide;
            // remove tile played by computer from available tiles
            availableTiles.splice(availableTiles.indexOf(tilePositionToTargetAndPlay), 1);
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

            return;

        }
    }

    // check for top right and bottom right
    if (gamesPlayedByComputer.includes(topRightTilePosition) && gamesPlayedByComputer.includes(bottomRightTilePosition)) {
        // check if the tile inbetween them is empty
        if (document.getElementById("6").innerText === "") {
            // play this tile
            tilePositionToTargetAndPlay = "6";
            // add postion played to computer's game played array
            gamesPlayedByComputer.push(tilePositionToTargetAndPlay);
            // output tile to be played
            document.getElementById(tilePositionToTargetAndPlay).innerText = computerGameSide;
            // remove tile played by computer from available tiles
            availableTiles.splice(availableTiles.indexOf(tilePositionToTargetAndPlay), 1);
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

            return;

        }
    }


    // target the middle tile first
    // check if the middle tile has not been played
    // then check the edges and play on the available one
    if (middleTile.innerText === "") {
        // that means the middle tile is available, so the computer should play it
        tilePositionToTargetAndPlay = middleTilePosition;
        console.log(tilePositionToTargetAndPlay);
    } else if (topLeftTile.innerText === "") {
        tilePositionToTargetAndPlay = topLeftTilePosition;
        console.log(tilePositionToTargetAndPlay);
    } else if (topRightTile.innerText === "") {
        tilePositionToTargetAndPlay = topRightTilePosition;
        console.log(tilePositionToTargetAndPlay);
    } else if (bottomLeftTile.innerText === "") {
        tilePositionToTargetAndPlay = bottomLeftTilePosition;
        console.log(tilePositionToTargetAndPlay);
    } else if (bottomRightTile.innerText === "") {
        tilePositionToTargetAndPlay = bottomRightTilePosition;
        console.log(tilePositionToTargetAndPlay);
    }


    if (tilePositionToTargetAndPlay === "") {
        // at this point the computer is not sure what tile to play
        // computer should go with a random available tile
        computerGamePlayAIEasyMode();
        return;
    }


    // add postion played to computer's game played array
    gamesPlayedByComputer.push(tilePositionToTargetAndPlay);
    // output tile to be played
    document.getElementById(tilePositionToTargetAndPlay).innerText = computerGameSide;
    // remove tile played by computer from available tiles
    availableTiles.splice(availableTiles.indexOf(tilePositionToTargetAndPlay), 1);
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


function ToEasy() {
    location.assign("index.html")
}

function ToHard() {
    location.assign("index3.html")
}