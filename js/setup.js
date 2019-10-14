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
    similarListElement.innerHTML = '';
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderWizard(arr[i]));
    }

    similarListElement.appendChild(fragment);
  }

  // выбираем похожих волшебников из массива
  function getRandomWizardsArray(arr, count) {
    return arr.sort(function () {
      return Math.random() - 0.5;
    }).slice(0, count);
  }

  function updateWizards(colorCoat, colorEyes) {

    var filteredWizards = wizards.sort(function (left, right) {
      var rankDiff = getRank(right, colorCoat, colorEyes) - getRank(left, colorCoat, colorEyes);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    });

    createSimilarWizards(filteredWizards.slice(0, WIZARD_AMOUNT));
  }

  var getRank = function (wizard, colorCoat, colorEyes) {
    var rank = 0;

    if (wizard.colorCoat === colorCoat) {
      rank += 2;
    }
    if (wizard.colorEyes === colorEyes) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  // экспорт
  window.setup = {
    wizards: wizards,
    updateWizards: updateWizards
  };

  window.backend.load(function (data) {
    wizards = data;
    createSimilarWizards(getRandomWizardsArray(wizards, WIZARD_AMOUNT));
    document.querySelector('.setup-similar').classList.remove('hidden');
  }, window.backend.showError);

})();
