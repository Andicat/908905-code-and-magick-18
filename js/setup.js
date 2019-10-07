'use strict';

(function () {
  var WIZARD_AMOUNT = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');

  // создаем волшебника
  function renderWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

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

  // выбираем случайных волшебников из массива
  function getRandomWizardsArray(arr, count) {
    return arr.sort(function () {
      return Math.random() - 0.5;
    }).slice(0, count);
  }

  window.backend.load(function (wizards) {
    createSimilarWizards(getRandomWizardsArray(wizards, WIZARD_AMOUNT));
    document.querySelector('.setup-similar').classList.remove('hidden');
  }, window.backend.showError);
})();
