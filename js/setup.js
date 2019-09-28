'use strict';

var WIZARD_AMOUNT = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupForm = document.querySelector('.setup-wizard-form');
var setupOpen = document.querySelector('.setup-open');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupUserName = document.querySelector('.setup-user-name');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = document.querySelector('.setup-similar-list');

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// получаем случайный элемент массива
function getRandomElement(arr) {
  return arr[Math.round((arr.length - 1) * Math.random())];
}

// создаем массив волшебников со случайными характеристиками
function createRandomWizardArray(amount) {
  var wizardsArray = [];

  for (var i = 0; i < amount; i++) {
    var randomWizard = {};

    randomWizard.name = getRandomElement(names) + ' ' + getRandomElement(surnames);
    randomWizard.coatColor = getRandomElement(coatColors);
    randomWizard.eyesColor = getRandomElement(eyesColors);

    wizardsArray.push(randomWizard);
  }

  return wizardsArray;
}

// создаем волшебника
function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

// вставляем волшебников на форму
function createSimilarWizards(arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }

  similarListElement.appendChild(fragment);
}

// открытие окна настройки персонажа
function onClickSetupOpen() {
  setup.classList.remove('hidden');
}

// валидация поля имени пользователя
function invalidUserName(evt) {
  evt.preventDefault();

  if (setupUserName.validity.tooShort) {
    setupUserName.setCustomValidity('Имя волшебника должно состоять как минимум из 2-х символов');
  } else if (setupUserName.validity.tooLong) {
    setupUserName.setCustomValidity('Имя волшебника не должно превышать  25-ти символов');
  } else if (setupUserName.validity.valueMissing) {
    setupUserName.setCustomValidity('Обязательное поле');
  } else {
    setupUserName.setCustomValidity('');
  }
}

function onSubmitSetupForm() {
  setupForm.submit();
}

// обработка событий формы по клику
function onClickSetupForm(evt) {
  evt.preventDefault();

  var randomColor;

  if (evt.target.classList.contains('setup-close')) {
    setup.classList.add('hidden');
  }
  if (evt.target.classList.contains('wizard-coat')) {
    randomColor = getRandomElement(coatColors);

    evt.target.setAttribute('style', 'fill: ' + randomColor);
    setupForm.querySelector('input[name = coat-color]').setAttribute('value', randomColor);
  }
  if (evt.target.classList.contains('wizard-eyes')) {
    randomColor = getRandomElement(eyesColors);

    evt.target.setAttribute('style', 'fill: ' + randomColor);
    setupForm.querySelector('input[name = eyes-color]').setAttribute('value', randomColor);
  }
  if (evt.target.classList.contains('setup-fireball')) {
    randomColor = getRandomElement(fireballColors);

    evt.target.parentElement.setAttribute('style', 'background : ' + randomColor);
    setupForm.querySelector('input[name = fireball-color]').setAttribute('value', randomColor);
  }
}

setupOpenIcon.setAttribute('tabindex', '0');
setupForm.querySelector('.setup-close').setAttribute('tabindex', '0');
setupUserName.setAttribute('minlength', 2);
setupUserName.setAttribute('maxlength', 25);
setupForm.action = 'https://js.dump.academy/code-and-magick';
setupForm.method = 'POST';
setupForm.enctype = 'multipart/form-data';

setupForm.addEventListener('click', onClickSetupForm);
setupForm.addEventListener('submit', onSubmitSetupForm);
setupOpen.addEventListener('click', onClickSetupOpen);
setupUserName.addEventListener('invalid', invalidUserName);

// обработка нажатия клавиш на клавиатуре
window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    if (evt.target === setupOpenIcon) {
      onClickSetupOpen();
    }
    if (evt.target.classList.contains('setup-close')) {
      setup.classList.add('hidden');
    }
    if (evt.target.classList.contains('setup-submit')) {
      onSubmitSetupForm();
    }
  }

  if (evt.keyCode === ESC_KEYCODE) {
    if (document.activeElement !== setupUserName) {
      evt.preventDefault();
      setup.classList.add('hidden');
    }
  }
});

var wizards = createRandomWizardArray(WIZARD_AMOUNT);
createSimilarWizards(wizards);
document.querySelector('.setup-similar').classList.remove('hidden');
