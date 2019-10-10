'use strict';

(function () {
  var WIZARD_AMOUNT = 4;

  var wizards;

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

  // выбираем похожих волшебников из массива
  function getSimilarWizardsArray(arr, count) {
    return arr.sort(function () {
      return Math.random() - 0.5;
    }).slice(0, count);
  }

  function updateWizards() {
    console.log(window.dialog.colorCoat);
    console.log(window.dialog.colorEyes);
  }

  // экспорт
  window.setup = {
    wizards: wizards,
    updateWizards: updateWizards
  };

  window.backend.load(function (data) {
    wizards = data;
    console.log(wizards);
    createSimilarWizards(getSimilarWizardsArray(wizards, WIZARD_AMOUNT));
    document.querySelector('.setup-similar').classList.remove('hidden');
  }, window.backend.showError);

  
})();
