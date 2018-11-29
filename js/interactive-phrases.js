const PHRASES = [
  'mudar seu ambiente',
  'construir com imaginação',
  'pensar um outro mundo',
  'criar com as mãos'
];

let currentPhraseIndex = 0;
let currentLetterIndex = 0;
let currentPhrase = '';

let interactiveElement;
let interactiveElementInvisible;

function fadeInWord() {
  currentPhraseIndex = (currentPhraseIndex + 1) % PHRASES.length;
  interactiveElement.innerHTML = PHRASES[currentPhraseIndex];
  interactiveElement.style.opacity = 1;
  setTimeout(fadeOutWord, 2000);
}

function fadeOutWord() {
  interactiveElement.style.opacity = 0;
  setTimeout(fadeInWord, 1200);
}

function updateWord() {
  currentPhraseIndex = (currentPhraseIndex + 1) % PHRASES.length;
  currentPhrase = PHRASES[currentPhraseIndex];
  currentLetterIndex = 0;
  interactiveElement.innerHTML = '';
  interactiveElementInvisible.innerHTML = currentPhrase;
  interactiveElement.style.opacity = 1;
  setTimeout(addLetter, 1000);
}

function addLetter() {
  if(currentLetterIndex > currentPhrase.length) {
    interactiveElement.style.opacity = 0;
    setTimeout(updateWord, 1200);
  } else {
    let typedPhrase = currentPhrase.slice(0, currentLetterIndex);
    let invisiblePhrase = currentPhrase.slice(currentLetterIndex);

    interactiveElement.innerHTML = typedPhrase;
    interactiveElementInvisible.innerHTML = invisiblePhrase;
    currentLetterIndex = currentLetterIndex + 1;
    setTimeout(addLetter, 200);
  }
}

window.addEventListener('load', function() {
  interactiveElement = document.getElementsByClassName('parallax-interactive')[0];
  interactiveElementInvisible = document.getElementsByClassName('parallax-interactive-invisible')[0];
  // setTimeout(fadeInWord, 100);
  setTimeout(updateWord, 100);
});
