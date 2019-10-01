'use strict';

(function () {
  var WIZARD_AMOUNT = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');

  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  // создаем массив волшебников со случайными характеристиками
  function createRandomWizardArray(amount) {
    var wizardsArray = [];

    for (var i = 0; i < amount; i++) {
      var randomWizard = {};

      randomWizard.name = window.getRandomElement(names) + ' ' + window.getRandomElement(surnames);
      randomWizard.coatColor = window.getRandomElement(window.coatColors);
      randomWizard.eyesColor = window.getRandomElement(window.eyesColors);

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

  var wizards = createRandomWizardArray(WIZARD_AMOUNT);
  createSimilarWizards(wizards);
  document.querySelector('.setup-similar').classList.remove('hidden');
})();
