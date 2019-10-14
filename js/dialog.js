'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var setup = document.querySelector('.setup');
  var setupForm = document.querySelector('.setup-wizard-form');
  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setupUserName = document.querySelector('.setup-user-name');
  var setupAvatar = setup.querySelector('.upload');
  var colorCoat = setupForm.querySelector('input[name = coat-color]').value;
  var colorEyes = setupForm.querySelector('input[name = eyes-color]').value;

  // открытие окна настройки персонажа
  function onClickSetupOpen() {
    setup.classList.remove('hidden');
    setup.style = '';
  }

  // валидация поля имени пользователя
  function invalidUserName() {
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

  // обработка событий формы по клику
  function onClickSetupForm(evt) {
    if (evt.target.classList.contains('setup-close')) {
      setup.classList.add('hidden');
    }
    if (evt.target.classList.contains('wizard-coat')) {
      colorCoat = window.colorize(evt.target, window.coatColors, setupForm.querySelector('input[name = coat-color]'));
      window.debounce(function () {
        window.setup.updateWizards(colorCoat, colorEyes);
      }());
    }
    if (evt.target.classList.contains('wizard-eyes')) {
      colorEyes = window.colorize(evt.target, window.eyesColors, setupForm.querySelector('input[name = eyes-color]'));
      window.debounce(function () {
        window.setup.updateWizards(colorCoat, colorEyes);
      }());
    }
    if (evt.target.classList.contains('setup-fireball')) {
      window.colorize(evt.target.parentElement, window.fireballColors, setupForm.querySelector('input[name = fireball-color]'));
    }
  }

  // перетаскивание окна настроек
  setupAvatar.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clEvt) {
          clEvt.preventDefault();
          setupAvatar.removeEventListener('click', onClickPreventDefault);
        };
        setupAvatar.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  setupOpenIcon.setAttribute('tabindex', '0');
  setupForm.querySelector('.setup-close').setAttribute('tabindex', '0');
  setupUserName.setAttribute('minlength', 2);
  setupUserName.setAttribute('maxlength', 25);

  setupForm.addEventListener('click', onClickSetupForm);
  setupOpen.addEventListener('click', onClickSetupOpen);
  setupUserName.addEventListener('invalid', invalidUserName);

  setupForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(setupForm), function () {
      setup.classList.add('hidden');
    }, window.backend.showError);
    evt.preventDefault();
  });

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
      if (document.querySelector('.error')) {
        document.querySelector('.error').remove();
      } else if (evt.target.classList.contains('setup-submit')) {
        setupForm.submit();
      }
    }

    if (evt.keyCode === ESC_KEYCODE) {
      if (document.querySelector('.error')) {
        document.querySelector('.error').remove();
      } else
      if (document.activeElement !== setupUserName) {
        evt.preventDefault();
        setup.classList.add('hidden');
      }
    }
  }
  );
})();
