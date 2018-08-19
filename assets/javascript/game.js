
// Set initial conditions
var movieTitles = ["INCEPTION", "THE SHAWSHANK REDEMPTION", "THE DARK KNIGHT", "FORREST GUMP", "THE MATRIX", "STAR WARS", "SAVING PRIVATE RYAN", "THE DEPARTED", "THE LION KING", "GLADIATOR"];
var guessesRemaining = 6;
var randTitle = movieTitles[Math.floor(Math.random() * movieTitles.length)];
var titleArray = randTitle.split("");
var titleArray2 = [];
var blanksArray = [];
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

document.getElementById("currentGuesses").innerHTML = guessesRemaining;
console.log(titleArray);

// Create initial series of blanks
for (i = 0; i < titleArray.length; i++) {
    blanksArray.push("_");
    document.getElementById("currentWord").innerHTML += blanksArray[i] + " ";
}
// Create working array, remove spaces
for (i=0; i<titleArray.length; i++) {
    titleArray2.push(titleArray[i].toLowerCase());
}
for (i = 0; i < 3; i++) {
    if (titleArray2.indexOf(" ") >= 0) {
        titleArray2.splice(titleArray2.indexOf(" "), 1);
    }
}
// Take key pressed, look for match, change blank to letter, remove from array2
document.onkeyup = function (event) {
    var letter = event.key;
    for (i = 0; i < titleArray.length; i++) {
        if (letter == titleArray[i].toLowerCase()) {
            blanksArray[i] = letter;
            letterGuessed = true;
        }
    }
    // Actions to perform if correct letter guessed
    if (letterGuessed) {
        document.getElementById("currentWord").innerHTML = " ";
        for (i = 0; i < blanksArray.length; i++) {
            document.getElementById("currentWord").innerHTML += blanksArray[i].toUpperCase() + " ";
        }
        for (i=0; i< titleArray2.length; i++) {
            if (titleArray2.indexOf(letter) >= 0) {
                titleArray2.splice(titleArray2.indexOf(letter), 1);
            }
        }
        letterGuessed = false;
    }
    else {
        guessesRemaining--;
        document.getElementById("currentGuesses").innerHTML = guessesRemaining;
        document.getElementById("guessedLetters").innerHTML += letter;
    }
    // Game over actions
    if (guessesRemaining == 0) {
        document.getElementById("currentGuesses").innerHTML = "GAME OVER";
    }
    // Game won actions
    if (titleArray2.length == 0) {
        numWins++;
        document.getElementById("currentGuesses").innerHTML = "YOU WIN";
        document.getElementById("winCounter").innerHTML = "Number of wins: " + numWins;
        document.getElementById("movie-poster").src = "assets/images/"+movieImages[randTitle];

        // Create new series of blanks
        randTitle = movieTitles[Math.floor(Math.random() * movieTitles.length)];
        titleArray = randTitle.split("");
        titleArray2 = [];
        blanksArray = [];
        letterGuessed = false;
        guessesRemaining = 6;
        document.getElementById("currentGuesses").innerHTML = guessesRemaining;
        document.getElementById("currentWord").innerHTML = " ";
        document.getElementById("guessedLetters").innerHTML = " ";
        // Create working array, remove spaces
        for (i=0; i<titleArray.length; i++) {
            titleArray2.push(titleArray[i].toLowerCase());
        }
        for (i = 0; i < 3; i++) {
            if (titleArray2.indexOf(" ") >= 0) {
                titleArray2.splice(titleArray2.indexOf(" "), 1);
            }
        }
        for (i = 0; i < titleArray.length; i++) {
            blanksArray.push("_");
            document.getElementById("currentWord").innerHTML += blanksArray[i] + " ";
        }
    }
}