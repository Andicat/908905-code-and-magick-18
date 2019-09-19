'use strict';

var WIZARD_AMOUNT = 4;

var setupForm = document.querySelector('.setup');

setupForm.classList.remove('hidden');

var wizards = [];

var names = ['Иван','Хуан Себастьян','Мария','Кристоф','Виктор','Юлия','Люпита','Вашингтон'];
var surnames = ['да Марья','Верон','Мирабелла','Вальц','Онопко','Топольницкая','Нионго','Ирвинг'];
var coatColors = ['rgb (101, 137, 164)','rgb (241, 43, 107)','rgb (146, 100, 161)','rgb (56, 159, 117)','rgb (215, 210, 55)','rgb (0, 0, 0)'];
var eyesColors = ['black','red','blue','yellow','green'];

for (var i = 0; i < WIZARD_AMOUNT; i++) {
  var randomWizard = {};
  randomWizard.name = names[Math.round((names.length - 1) * Math.random())] + ' ' + surnames[Math.round((surnames.length - 1) * Math.random())];
  randomWizard.coatColor = coatColors[Math.round((coatColors.length - 1) * Math.random())];
  randomWizard.eyesColor = eyesColors[Math.round((eyesColors.length - 1) * Math.random())];
  wizards.push(randomWizard);
}

var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');



