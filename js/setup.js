'use strict';

var WIZARD_AMOUNT = 4;

var setupForm = document.querySelector('.setup');

setupForm.classList.remove('hidden');

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomElement = function (arr) {
  return arr[Math.round((arr.length - 1) * Math.random())];
};

var createRandomWizardArray = function (amount) {
  var wizardsArray = [];

  for (var i = 0; i < amount; i++) {
    var randomWizard = {};

    randomWizard.name = getRandomElement(names) + ' ' + getRandomElement(surnames);
    randomWizard.coatColor = getRandomElement(coatColors);
    randomWizard.eyesColor = getRandomElement(eyesColors);

    wizardsArray.push(randomWizard);
  }

  return wizardsArray;
};

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = document.querySelector('.setup-similar-list');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createSimilarWizards = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }

  similarListElement.appendChild(fragment);
};

var wizards = createRandomWizardArray(WIZARD_AMOUNT);
createSimilarWizards(wizards);


document.querySelector('.setup-similar').classList.remove('hidden');
