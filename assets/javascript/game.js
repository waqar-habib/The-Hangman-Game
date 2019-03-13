// Grab reference to DOM elements: these are ids pulled directly from the HTML document so we can call them out in JS

var newGameButton = document.getElementById('new-game-button');
var placeholders = document.getElementById('placeholders');
var guessedLetters = document.getElementById('guessed-letters');
var guessesLeft = document.getElementById('guesses-left');
var wins = document.getElementById('wins');
var losses = document.getElementById('losses');

//Create variables for game (wordBank, wins, losses, wordPicked, guessesLeft, gameRunning, pickedWord, pickedWordPlaceholderArr guessedLetterBank, incorrectLetterBank)

var wordBank = ['Paris', 'Dubai', 'Kuala Lumpur', 'Istanbul', 'Karachi', 'Houston', 'Ho Chi Minh City', 'Mexico City', 'Austin', 'Addis Ababa', 'Abu Dhabi', 'Riyadh', 'Hyderabad', 'Port Au Prince'];

/* Set initial wins/losses to 0*/

var wins = 0;
var losses = 0;

/* Initially want the game to not run, UNTIL the user presses the new game button */

var guessesLeft = 8;
var gameRunning = false;

/* empty string where the picked word would go */
var pickedWord = ''; 

/* three empty arrays where we'll method.push based on the userInput */
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = []; 

// newGame function to reset all stats, pick new word and create placeholders

function newGame () {
    // Reset all game stats
    gameRunning = true;
    guessesLeft = 8;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];
    
    // Pick a new word: go into the wordBank, generate a random index number from the array, ONLY from the length of the index, and round it to the nearest lowest whole number.
    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    console.log(pickedWord);

    // Create placeholders out of new pickedWord using a "for loop"
    // Basically JS will loop over whatever word pickedWord generated and it will add spaces/underscores.
    /* 1. For the variable 'i', when i is less than the length of 'pickedWord', add 1 to var i
        1.1 - IF the picked word contains a space (as in "Kuala Lumpur") push a space
        1.2 - ELSE advance to the next letter (denoted by the underscore)
    */
    for (var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i] === ' ') {
            pickedWordPlaceholderArr.push(' ');
        } else {
            pickedWordPlaceholderArr.push('_');
        }
    } 

    // Write all new game info to DOM using ".textContent"
    /* Using the ".textContent" method call the variables previously created so we can WRITE the stuff generated by the functions above */

    document.getElementById("guesses-left").textContent = guessesLeft;
    document.getElementById("placeholders").textContent = pickedWordPlaceholderArr.join('');
    document.getElementById("guessed-letters").textContent = incorrectLetterBank;
}

// letterGuess function: takes in the letter pressed and sees if it's a part of the selected word
/* If the game is running (gameRunning  = true) and the user hasn't guessed the letter yet (indexOf = -1) */

function letterGuess(letter) {
    console.log(letter);

    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
    // Run Game logic  
    guessedLetterBank.push(letter);

    // For loop checks to see if the guessed letter is in the pickedWord
    for (var i = 0; i < pickedWord.length; i++) {
        // .toLowerCase coverts the letter to compare should the letter in the pickedWord is a capital letter (all of which start with a capital letter)
        if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
            // Should there be a match, replace the "_" with the actual letter
            pickedWordPlaceholderArr[i] = pickedWord[i];
        }   
    }
    // Write it back to the DOM
    placeholders.textContent = pickedWordPlaceholderArr.join('');
    // Pass letter into the checkIncorrect function
    checkIncorrect(letter);
    } 
    
    else {
        if (!gameRunning) { /* If game is NOT running, click on the New Game button  */
            alert("Click on the New Game button!");
        } else { 
        /* Otherwise, the user has already guessed this letter and needs to pick a new one */
            alert ("Try a new letter!");
        }
    }
}

// checkIncorrect(letter): This function checks to see if an incorrect letter was typed
function checkIncorrect(letter) {
    // Check to see if letter DIDN'T make it into our pickWordPlaceHolder (therefore, incorrect guess)
    if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 && pickedWordPlaceholderArr.indexOf(letter.toUpperCase())=== -1) 
    {
        // Decrement guesses
        guessesLeft--;
        // Add incorrect letter to incorrectLetterBank
        incorrectLetterBank.push(letter);
        // Write new bank of incorrect letter guessed to DOM
        document.getElementById("guessed-letters").textContent = incorrectLetterBank.join(' ');
        // Write new amount of guesses left to DOM
        document.getElementById("guesses-left").textContent = guessesLeft;
    }
    checkLoss();
}

// checkLoss: This function checks to see if the user lost the game

function checkLoss() {
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        document.getElementById("losses").textContent = losses;
        alert ("You Lost!");
    }
    checkWin();
}

// checkWin: This function checks to see if the user won the game

function checkWin() {
	if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join('').toLowerCase()) {
		wins++;
		document.getElementById("wins").textContent = wins;
        alert ("You Win!");
    }
   
}

// EventLister for new game button
// Reference newGameButton with the Event Listener so it executes the program when the button is clicked. 
document.getElementById("new-game-button").addEventListener('click', newGame);

// onekeyup event to trigger letterGuessed
document.onkeyup = function(event) {
    // If any key is pressed between "a (65)" AND "z (90)" 
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}