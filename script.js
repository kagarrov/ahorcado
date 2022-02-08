const formElement = document.getElementById("word-to-guess-form");
const displayTryLetter = document.getElementById("try-letter");
const formTryLetter = document.getElementById("try-letter-form");
const letterInput = document.getElementById("letter");
const wordPlaceholders = document.getElementById("word-placeholders");
const arrayOfTries = document.getElementById("array-of-tries");
const imageDisplay = document.getElementById("image");
const imageElement = document.getElementById("image-element");
const statusDisplay = document.getElementById("status");
const btnStartAgain = document.getElementById("btn-start-again");
const wordToGuessInput = document.getElementById('word-to-guess');

formElement.addEventListener("submit", saveWordtoGuess);
formTryLetter.addEventListener("submit", saveLetter);
btnStartAgain.addEventListener("click", startAgain);

let wordToGuessString;
let wordsEntered = [];
let numberOfGuessedLetters = 0;
// let numberOfTries = 0;
let numberOfFailedTries = 0;
const maxNumberOfTries = 6;
let isInWordEntered;

function saveWordtoGuess(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const wordToGuess = formData.get("word-to-guess");
  wordToGuessString = wordToGuess.split("");
  // console.log(wordToGuessString);
  createWordPlaceholders(wordToGuessString);
}

function createWordPlaceholders(wordToGuessString) {
  formElement.style.display = "none";
  displayTryLetter.style.display = "block";
  imageDisplay.style.display = "block";
  for (const letter of wordToGuessString) {
    const letterPlaceholder = document.createElement("LI");
    // letterPlaceholder.textContent = letter;
    // letterPlaceholder.style.backgroundColor = 'red';
    document.getElementById("word-placeholders").appendChild(letterPlaceholder);
  }
}

function saveLetter(event) {
  event.preventDefault();
  const formDataLetter = new FormData(event.target);
  const letterTry = formDataLetter.get("letter");

  isInWordEntered = reviewIfAlreadyEntered(letterTry);
  console.log(isInWordEntered);

  if (isInWordEntered) {
    alert("You already entered this letter!");
  } else {
    reviewLetterInWord(letterTry);
  }
}

function reviewIfAlreadyEntered(letterTry) {
  return wordsEntered.includes(letterTry);
}

function reviewLetterInWord(letterTry) {
  let letterIsInTheWord = false;
  wordsEntered.push(letterTry);
  letterInput.value = "";
  const arrayLetter = document.createElement("P");
  arrayLetter.textContent = letterTry;
  arrayOfTries.appendChild(arrayLetter);

  console.log(document.getElementById("word-placeholders").childNodes[0]);
  for (i = 0; i < wordToGuessString.length; i++) {
    if (wordToGuessString[i].toLowerCase() == letterTry.toLowerCase()) {
      wordPlaceholders.childNodes[i].textContent = letterTry;
      numberOfGuessedLetters = numberOfGuessedLetters + 1;
      console.log(numberOfGuessedLetters);
      letterIsInTheWord = true;
    }
  }

  if (letterIsInTheWord == false) {
    numberOfFailedTries = numberOfFailedTries + 1;
    checkMaxNumberOfFailedTries(numberOfFailedTries);
    imageElement.src = "/images/" + numberOfFailedTries + ".png";
  }

  checkWin(numberOfGuessedLetters);
}

function checkWin(numberOfGuessedLetters) {
  if (numberOfGuessedLetters == wordToGuessString.length) {
    imageDisplay.style.display = "none";
    formTryLetter.style.display = "none";
    wordPlaceholders.style.display = "none";
    arrayOfTries.style.display = "none";

    statusDisplay.style.display = "block";
    statusDisplay.firstElementChild.textContent = "You WON!!!";

    console.log(numberOfGuessedLetters);
    console.log("you won!");
  }
}

function checkMaxNumberOfFailedTries(numberOfFailedTries) {
  if (numberOfFailedTries == maxNumberOfTries) {
    formTryLetter.style.display = "none";
    wordPlaceholders.style.display = "none";
    arrayOfTries.style.display = "none";
    console.log("you lose");
  }
}

function startAgain() {
  formElement.style.display = "flex";
  formTryLetter.style.display = "none";
  wordPlaceholders.style.display = "none";
  arrayOfTries.style.display = "none";
  statusDisplay.style.display = "none";
  imageDisplay.style.display = "none";
  wordToGuessString = [];
  wordToGuessInput.value = "";
  wordsEntered = [];
  numberOfGuessedLetters = 0;
  // let numberOfTries = 0;
  numberOfFailedTries = 0;
}
