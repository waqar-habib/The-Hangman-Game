// Grab reference to DOM elements: these are ids pulled directly from the HTML document so we can call them out in JS

var $newGameButton = document.getElementById('new-game-button');
var $placeholders = document.getElementById('placeholders');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');

//Create variables for game (wordBank, wins, losses, wordPicked, guessesLeft, gameRunning, pickedWord, pickedWordPlaceholderArr guessedLetterBank, incorrectLetterBank)

var wordBank = ['Paris', 'Dubai', 'Kuala Lumpur', 'Istanbul', 'Karachi', 'Houston'];

/* Set initial wins/losses to 0*/

var wins = 0;
var losses = 0;

/* Comment goes here*/

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

    // Create placeholders out of new pickedWord using a "for loop"
    
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

    // Write all new game info to DOM using "text.Content"
    




}


// letterGuess function: takes in the letter pressed and sees if it's a part of the selected word


// checkIncorrect(letter)



// checkLose



// checkWin




// EventLister for new game button




// onekeyup event to trigger letterGuessed