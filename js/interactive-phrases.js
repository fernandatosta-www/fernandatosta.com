const PHRASES = [
  'mudar seu ambiente  ',
  'construir com imaginação  ',
  'pensar um outro mundo  ',
  'criar com as mãos  ',
  'planejar seus próprios móveis  '
];

let currentPhraseIndex = 0;
let currentLetterIndex = 0;
let currentPhrase = '';
let inputPhrase = '';

let interactiveElement;
let interactiveElementInvisible;

let myTimeout;

function fadeInWord() {
  currentPhraseIndex = (currentPhraseIndex + 1) % PHRASES.length;
  interactiveElement.innerHTML = PHRASES[currentPhraseIndex];
  interactiveElement.style.opacity = 1;
  myTimeout = setTimeout(fadeOutWord, 2000);
}

function fadeOutWord() {
  interactiveElement.style.opacity = 0;
  myTimeout = setTimeout(fadeInWord, 1200);
}

function updateWord() {
  currentPhraseIndex = (currentPhraseIndex + 1) % PHRASES.length;
  currentPhrase = PHRASES[currentPhraseIndex];
  currentLetterIndex = 0;
  interactiveElement.innerHTML = '';
  interactiveElementInvisible.innerHTML = currentPhrase;
  interactiveElement.style.opacity = 1;
  myTimeout = setTimeout(addLetter, 1000);
}

function addLetter() {
  if(currentLetterIndex > currentPhrase.length) {
    interactiveElement.style.opacity = 0;
    myTimeout = setTimeout(updateWord, 1200);
  } else {
    let typedPhrase = currentPhrase.slice(0, currentLetterIndex);
    let invisiblePhrase = currentPhrase.slice(currentLetterIndex);

    interactiveElement.innerHTML = typedPhrase;
    interactiveElementInvisible.innerHTML = invisiblePhrase;
    currentLetterIndex = currentLetterIndex + 1;
    myTimeout = setTimeout(addLetter, 200);
  }
}

function handleClick() {
  clearTimeout(myTimeout);

  let i = document.createElement('input');
  i.classList.add('user-phrase-input');
  i.setAttribute('maxlength', '20');

  interactiveElement.innerHTML = '';
  interactiveElement.appendChild(i);
  interactiveElementInvisible.innerHTML = currentPhrase;
  interactiveElement.removeEventListener('click', handleClick);

  i.addEventListener('keyup', function() {
    i.style.width = ((i.value.length + 1) * 48) + 'px';
    interactiveElementInvisible.innerHTML = currentPhrase.slice(0, currentPhrase.length - i.value.length);
  });

  i.focus();
}

window.addEventListener('load', function() {
  interactiveElement = document.getElementsByClassName('parallax-interactive')[0];
  interactiveElementInvisible = document.getElementsByClassName('parallax-interactive-invisible')[0];
  myTimeout = setTimeout(updateWord, 100);
  // myTimeout = setTimeout(fadeInWord, 100);
  // interactiveElement.addEventListener('click', handleClick);
});
