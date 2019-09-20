'use strict';

var WIZARD_AMOUNT = 4;

var setupForm = document.querySelector('.setup');

setupForm.classList.remove('hidden');

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var createRandomWizardArray = function (amount) {
  var wizardsArray = [];

  for (var i = 0; i < amount; i++) {
    var randomWizard = {};

    randomWizard.name = names[Math.round((names.length - 1) * Math.random())] + ' ' + surnames[Math.round((surnames.length - 1) * Math.random())];
    randomWizard.coatColor = coatColors[Math.round((coatColors.length - 1) * Math.random())];
    randomWizard.eyesColor = eyesColors[Math.round((eyesColors.length - 1) * Math.random())];

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

var wizards = createRandomWizardArray(WIZARD_AMOUNT);
var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');
