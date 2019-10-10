'use strict';

(function () {
  window.coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  window.eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  window.fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


  // получаем случайный элемент массива
  window.getRandomElement = function (arr) {
    return arr[Math.round((arr.length - 1) * Math.random())];
  };

  window.colorize = function (element, arr, input) {
    var randomColor = window.getRandomElement(arr);

    if (element.tagName.toLowerCase() === 'div') {
      element.style.backgroundColor = randomColor;
    } else {
      element.style.fill = randomColor;
    }
    input.value = randomColor;
    return randomColor;
  };
})();
