
// Set initial conditions
var movieTitles = ["INCEPTION", "THE SHAWSHANK REDEMPTION", "THE DARK KNIGHT", "FORREST GUMP", "THE MATRIX", "STAR WARS", "SAVING PRIVATE RYAN", "THE DEPARTED", "THE LION KING", "GLADIATOR"];
var letter = " ";
var guessesRemaining = 0;
var randTitle = " ";
var titleArray = [];
var titleArrayLower = [];
var titleArrayLowerTrim = [];
var blanksArray = [];
var lettersGuessed = [];
var letterGuessed = false;
var numWins = 0;
var movieImages = {
    "INCEPTION": "inception.jpg",
    "THE SHAWSHANK REDEMPTION": "shawshank.jpg",
    "THE DARK KNIGHT": "darkknight.jpg",
    "FORREST GUMP": "forrestgump.jpg",
    "THE MATRIX": "matrix.jpg",
    "STAR WARS": "starwars.jpg",
    "SAVING PRIVATE RYAN": "savingprivateryan.jpg",
    "THE DEPARTED": "departed.jpg",
    "THE LION KING": "lionking.jpg",
    "GLADIATOR": "gladiator.jpg"
}

function startGame() {
    guessesRemaining = 8;
    randTitle = movieTitles[Math.floor(Math.random() * movieTitles.length)];
    titleArray = randTitle.split("");
    titleArrayLower = [];
    titleArrayLowerTrim = [];
    blanksArray = [];
    lettersGuessed = [];
    letterGuessed = false;
    document.getElementById("currentWord").innerHTML = " ";
    document.getElementById("guessedLetters").innerHTML = " "
    document.getElementById("current-guesses").innerHTML = "Number of guesses remaining: " + guessesRemaining;
    // Create initial series of blanks
    for (i = 0; i < titleArray.length; i++) {
        blanksArray.push("_");
        document.getElementById("currentWord").innerHTML += blanksArray[i] + " ";
    }
    // Create working array, remove dups, spaces
    for (i = 0; i < titleArray.length; i++) {
        titleArrayLower.push(titleArray[i].toLowerCase());
    }
    titleArrayLowerTrim = Array.from(new Set(titleArrayLower));
    for (i = 0; i < 3; i++) {
        if (titleArrayLowerTrim.indexOf(" ") >= 0) {
            titleArrayLowerTrim.splice(titleArrayLower.indexOf(" "), 1);
        }
    }
    console.log(titleArray);
    console.log(titleArrayLower);
    console.log(titleArrayLowerTrim);
}

startGame();

function checkLetter () {
    for (i = 0; i < titleArray.length; i++) {
        if (letter == titleArray[i].toLowerCase()) {
            blanksArray[i] = letter;
            letterGuessed = true;
        }
    }
}

function performAction() {
    if (letterGuessed) {
        // Add letter to page
        document.getElementById("currentWord").innerHTML = " ";
        for (i = 0; i < blanksArray.length; i++) {
            document.getElementById("currentWord").innerHTML += blanksArray[i].toUpperCase() + " ";
        }
        // Remove letter from working array
        for (i = 0; i <= titleArrayLowerTrim.length; i++) {
            if (titleArrayLowerTrim.indexOf(letter) >= 0) {
                titleArrayLowerTrim.splice(titleArrayLowerTrim.indexOf(letter), 1);
            }
        }
        letterGuessed = false;
        console.log(titleArrayLowerTrim);
    }
    else {
        // Reduce guesses, add letter to guessed letters
        guessesRemaining--;
        document.getElementById("current-guesses").innerHTML = guessesRemaining;
        lettersGuessed.push(letter);
        document.getElementById("guessedLetters").innerHTML += letter;
    }
}
    
function gameOver() {
    document.getElementById("message").innerHTML = "GAME OVER";
}

function gameWon() {
        numWins++;
        document.getElementById("message").innerHTML = "YOU WIN";
        document.getElementById("winCounter").innerHTML = "Number of wins: " + numWins;
        document.getElementById("movie-poster").src = "assets/images/" + movieImages[randTitle];
    }

// Take key pressed, look for match, change blank to letter, remove from array2
document.onkeyup = function (event) {
    letter = event.key;
    document.getElementById("message").innerHTML = "";
    checkLetter();
    performAction();
    if (titleArrayLowerTrim.length == 0) {
        gameWon();
        startGame();
    }
    if (guessesRemaining == 0) {
        gameOver();
        startGame();
    }
}