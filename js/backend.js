'use strict';

(function () {
  function load(onLoad) {
    var URL = 'https://js.dump.academy/code-and-magick/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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

    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();

  }

  function onError(error) {
    var errorModal = document.createElement('div');
    errorModal.style = 'position: absolute; height: auto; width: 500px; left: 50%; top: 50%; padding: 20px; background: #fff; border: 1px solid #333; z-index: 9999; transform: translate(-50%, -50%)';
    errorModal.classList.add('error');
    var errorMessage = document.createElement('h1');
    errorMessage.style = 'color: red; text-shadow: none; font-size: 30px';
    errorMessage.textContent = error;
    errorModal.appendChild(errorMessage);
    document.body.appendChild(errorModal);
  }

  function save(data, onLoad) {
    var URL = 'https://js.dump.academy/code-and-magick';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка соединения');
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);

  }

  // экспорт
  window.backend = {
    load: load,
    save: save,
    onError: onError
  };
})();
