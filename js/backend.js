'use strict';

(function () {
  function load(onLoad, onError) {
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
    
    xhr.timeout = 10000; // 10s
    
    xhr.open('GET', URL);
    xhr.send();
   
  };

  function onError(error) {
    var errorModal = document.createElement('div');
    errorModal.style = 'position: absolute; height: 500px; width: 500px; left: 50%; top: 50%; padding: 20px; background: #fff; border: 1px solid #333; z-index: 9999; transition: all 0.5s ease-in; transform: translate(-50%, -50%)';
	var errorMessage = document.createElement('h1');
	errorMessage.textContent = error;
	errorModal.appendChild(errorMessage);
    document.body.appendChild(errorModal);
    console.log(errorModal);
    function openWin() {
      errorModal.className = "overflow";
      document.body.appendChild(errorModal);
      errorModal.style.marginTop = '200px';
      errorModal.style.top = "50%";
	}
/*if (!Element.prototype.remove) {
        Element.prototype.remove = function remove() {
                if (this.parentNode) {
                        this.parentNode.removeChild(this);
                }
        };
}

overflow.onclick = function () {
        modal.style.top = "-100%";
        overflow.remove();
}*/
  };

  function save(data, onLoad, onError) {
  	var URL = 'https://js.dump.academy/code-and-magick1';
  	var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    
    xhr.open('POST', URL);
    xhr.send(data);

  };
 
  // экспорт
  window.backend = {
    load: load,
    save: save,
    onError: onError
  };
})();
