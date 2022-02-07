const formElement = document.getElementById("word-to-guess-form");
const displayTryLetter = document.getElementById("try-letter");
const formTryLetter = document.getElementById("try-letter-form");
const letterInput = document.getElementById("letter");
const wordPlaceholders = document.getElementById("word-placeholders");
const arrayOfTries = document.getElementById("array-of-tries");

formElement.addEventListener("submit", saveWordtoGuess);
formTryLetter.addEventListener("submit", saveLetter);

let wordToGuessString;
let wordsEntered = [];
let numberOfGuessedLetters = 0;
// let numberOfTries = 0;
let numberOfFailedTries = 0;
const maxNumberOfTries = 7;
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
  }

  checkWin(numberOfGuessedLetters);
}

function checkWin(numberOfGuessedLetters) {
  if (numberOfGuessedLetters == wordToGuessString.length) {
    formTryLetter.display = "none";
    wordPlaceholders.display = "none";
    arrayOfTries.display = "none";
    console.log(numberOfGuessedLetters);
    console.log("you won!");
  }
}

function checkMaxNumberOfFailedTries(numberOfFailedTries) {
  if (numberOfFailedTries == maxNumberOfTries) {
    console.log("you lose");
  }
}
