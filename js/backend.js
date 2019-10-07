'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick';
  var serverTime = 10000;
  var statusOk = 200;

  // настройки загрузки/отправки/ошибок
  function setup(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusOk) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = serverTime;

    return xhr;
  }

  // загрузка данных с сервера
  function load(onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', URL + '/data');
    xhr.send();
  }

  // отправка данных на сервер
  function save(data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  }

  // показ ошибки
  function showError(error) {
    var errorModal = document.createElement('div');
    errorModal.style = 'position: absolute; height: auto; width: 500px; left: 50%; top: 50%; padding: 20px; background: #fff; border: 1px solid #333; z-index: 9999; transform: translate(-50%, -50%)';
    errorModal.classList.add('error');
    var errorMessage = document.createElement('h1');
    errorMessage.style = 'color: red; text-shadow: none; font-size: 30px';
    errorMessage.textContent = error;
    errorModal.appendChild(errorMessage);
    document.body.appendChild(errorModal);
  }

  // экспорт
  window.backend = {
    load: load,
    save: save,
    showError: showError
  };
})();
