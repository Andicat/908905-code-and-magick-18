'use strict';

var WIZARD_AMOUNT = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupForm = document.querySelector('.setup-wizard-form');
var setupOpen = document.querySelector('.setup-open');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupClose = document.querySelector('.setup-close');
var setupSubmit = document.querySelector('.setup-submit');
var setupUserName = document.querySelector('.setup-user-name');
var setupWizardCoat = document.querySelector('.wizard-coat');
var setupWizardEyes = document.querySelector('.wizard-eyes');
var setupWizardFireball = document.querySelector('.setup-fireball-wrap');
var coatColorValue = document.getElementsByName('coat-color');
var eyesColorValue = document.getElementsByName('eyes-color');
var fireballColorValue = document.getElementsByName('fireball-color');

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

// закрытие окна настройки персонажа
function onClickSetupClose() {
  setup.classList.add('hidden');
}

// отправка формы
function onClickSetupSubmit() {
  setupForm.submit();
}

// смена цвета мантии
function onClicksetupWizardCoat() {
  var randomColor = getRandomElement(coatColors);
  setupWizardCoat.setAttribute('style', 'fill: ' + randomColor);
  coatColorValue[0].setAttribute('value', randomColor);
}

// смена цвета глаз
function onClicksetupWizardEyes() {
  var randomColor = getRandomElement(eyesColors);
  setupWizardEyes.setAttribute('style', 'fill: ' + randomColor);
  eyesColorValue[0].setAttribute('value', randomColor);
}

// смена цвета фаербола
function onClicksetupWizardFireball() {
  var randomColor = getRandomElement(fireballColors);
  setupWizardFireball.setAttribute('style', 'background : ' + randomColor);
  fireballColorValue[0].setAttribute('value', randomColor);
}

setupOpenIcon.setAttribute('tabindex', '0');
setupClose.setAttribute('tabindex', '0');
setupUserName.setAttribute('minlength', 2);
setupUserName.setAttribute('maxlength', 25);
setupForm.action = 'https://js.dump.academy/code-and-magick';
setupForm.method = 'POST';
setupForm.enctype = 'multipart/form-data';

// обработка событий открытия/закрытия формы по клику
setupOpen.addEventListener('click', onClickSetupOpen);
setupClose.addEventListener('click', onClickSetupClose);
setupWizardCoat.addEventListener('click', onClicksetupWizardCoat);
setupWizardEyes.addEventListener('click', onClicksetupWizardEyes);
setupWizardFireball.addEventListener('click', onClicksetupWizardFireball);

// обработка нажатия клавиш на клавиатуре
window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    if (evt.target === setupOpenIcon) {
      onClickSetupOpen();
    }
    if (evt.target === setupClose) {
      onClickSetupClose();
    }
    if (evt.target === setupSubmit) {
      onClickSetupSubmit();
    }
  }

  if (evt.keyCode === ESC_KEYCODE) {
    evt.preventDefault();
    if (document.activeElement !== setupUserName) {
      onClickSetupClose();
    }
  }
});

var wizards = createRandomWizardArray(WIZARD_AMOUNT);
createSimilarWizards(wizards);
document.querySelector('.setup-similar').classList.remove('hidden');
