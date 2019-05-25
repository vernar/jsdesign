/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/AjaxSend.js":
/*!*************************!*\
  !*** ./src/AjaxSend.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

class AjaxSend {
    ajaxSendResponce(formElement, method, url) {
        return new Promise(function(resolve, reject) {
            let formData = new FormData(formElement),
                request = new XMLHttpRequest(),
                obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });

            request.open(method, url);
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8;');

            request.onload = function() {
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    let error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };

            request.onerror = function() {
                reject(new Error("Network Error"));
            };

            request.send(JSON.stringify(obj));
        });
    }
}
module.exports = AjaxSend;


/***/ }),

/***/ "./src/ModalWindow.js":
/*!****************************!*\
  !*** ./src/ModalWindow.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

class ModalWindow {
    constructor(modalElement, overlay, triggers, closers) {
        this.modalElement = modalElement;
        this.overlay = overlay;
        this.triggers = triggers;
        this.closers = closers;

        this.initModal();
    }

    initModal() {
        this.triggers.forEach((item) => item.addEventListener('click', (event) => {
            this.modalShow();
        }));

        this.closers.forEach((item) => item.addEventListener('click', (event) => {
            this.modalHide();
        }));

        this.overlay.addEventListener('click', (event) => {
            if (event.target === this.overlay) {
                this.modalHide();
            }
        });
    }

    modalShow() {
        this.modalElement.style.display = 'block';
        this.overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    modalHide() {
        this.modalElement.style.display = 'none';
        this.overlay.style.display = 'none';
        document.body.style.overflow = '';
    }
}

module.exports = ModalWindow;

/***/ }),

/***/ "./src/PhoneTemplate.js":
/*!******************************!*\
  !*** ./src/PhoneTemplate.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

class PhoneTemplate {

    constructor(phoneInputElement, template, startPos) {
        String.prototype.replaceAt=function(index, replacement) {
            return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
        };

        this.phoneInput = phoneInputElement;
        this.template = template;
        this.curentString = template;
        this.startPosition = startPos;
        this.keyCode = '';
        this.phoneInput.value = template;
        this.setCursorPosition(startPos);

        this.startObservers();
    }

    isValid() {
        if (this.curentString.indexOf('_') === -1) {
            return true;
        }
        return false;
    }

    startObservers() {
        document.addEventListener('keydown', (event) => {
            this.keyCode = event.key;
        });

        document.addEventListener('input', (event) => {
            if (this.serviceKey() === true) {
                return;
            }
            let inputValue = this.phoneInput.value,
                currentPosition = this.phoneInput.selectionStart,
                inputPosition = this.phoneInput.selectionStart - 1;

            while (this.template[inputPosition] !== '_' && inputPosition < this.template.length) {
                inputPosition++;
                this.setCursorPosition(inputPosition);
            }

            if (!isNaN(parseInt(inputValue[inputPosition])) && this.template[inputPosition] === '_') {
                this.curentString = this.curentString.replaceAt(inputPosition, inputValue[inputPosition]);
                this.setInput(this.curentString);
                this.setCursorPosition(currentPosition);
            } else {
                this.setInput(this.curString);
                this.setCursorPosition(inputPosition);
            }

            while (this.template[currentPosition] !== '_' && currentPosition < this.template.length) {
                currentPosition++;
                this.setCursorPosition(currentPosition);
            }

        });
    }

    clearField() {
        this.curentString = this.template;
        this.phoneInput.value = this.template;
        this.setCursorPosition(this.startPosition);
        this.phoneInput.focus();
    }

    setInput(text = '') {
        this.curentString = text === '' ? this.curentString : text;
        this.phoneInput.value = this.curentString;
    }

    setCursorPosition(pos) {
        this.phoneInput.setSelectionRange(pos,pos);
    }

    serviceKey() {
        let keyCode = this.keyCode,
            currentPosition = this.phoneInput.selectionStart;

        if (keyCode === 'ArrowLeft' || keyCode === 'ArrowRight') {
            return true;
        }

        if (keyCode === 'Delete') {
            return true;
        }

        if (keyCode === 'Backspace') {
            while (this.template[currentPosition] !== '_' && currentPosition > 0) {
                currentPosition--;
            }
            this.curentString = this.curentString.replaceAt(currentPosition, this.template[currentPosition]);
            this.setInput();
            this.setCursorPosition(currentPosition);
            return true;
        }
        return false;
    }
}

module.exports = PhoneTemplate;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener("DOMContentLoaded", () => {

    //Modal popups
    let ModalWindow = __webpack_require__(/*! ./ModalWindow.js */ "./src/ModalWindow.js"),
        AjaxRequest = __webpack_require__(/*! ./AjaxSend.js */ "./src/AjaxSend.js"),
        PhoneTemplate = __webpack_require__(/*! ./PhoneTemplate.js */ "./src/PhoneTemplate.js");

    let modalCheckout = new ModalWindow(
            document.querySelector('.popup-design .popup-dialog'),
            document.querySelector('.popup-design'),
            document.querySelectorAll('.button-design'),
            [
                document.querySelector('.popup-design .popup-close'),
            ]),
        modalConsultation = new ModalWindow(
            document.querySelector('.popup-consultation .popup-dialog'),
            document.querySelector('.popup-consultation'),
            document.querySelectorAll('.button-consultation'),
            [
                document.querySelector('.popup-consultation .popup-close'),
            ]),
        modalGift = new ModalWindow     (
            document.querySelector('.popup-gift .popup-dialog'),
            document.querySelector('.popup-gift'),
            document.querySelectorAll('.fixed-gift'),
            [
                document.querySelector('.popup-gift .popup-close')
            ]
        );

    let ajax = new AjaxRequest();

    let messages = {
        ajaxSuccess: {
            text: 'Собщение отправлено',
            class: 'success',
        },
        ajaxProcess: {
            text: 'Отправка',
            class: 'process',
        },
        ajaxError: {
            text: 'Ошибка',
            class: 'error',
        },
        invalidPhone: {
            text: 'Заполните поле телефона'
        }
    };

    function toggle(element, state = '') {
        if (state === '') {
            element.style.display = element.style.display === "none" ? 'block' : 'none';
        } else {
            element.style.display = state;
        }
    }
    //6. Show more stiles
    let moreStilesButton = document.querySelector('.button-styles'),
        hidenBlocks = document.querySelectorAll('.styles .hidden-lg'),
        classToShow = 'col-sm-3 col-sm-offset-0 col-xs-10 col-xs-offset-1';
    moreStilesButton.addEventListener('click', () => {
        hidenBlocks.forEach((element) => {
            element.className = classToShow;
        });
        moreStilesButton.style.display = 'none';
    });


    //5.gift
    let giftIcon = document.querySelector('.fixed-gift');
    setTimeout(() => {
        giftIcon.style.display = 'block';
    },3000);
    giftIcon.addEventListener('click', () => {
        giftIcon.style.display = 'none';
    });

    //4.ajax submit for checkout modal window
    (() => {
        //create message div block
        let messageContainer = document.createElement('div'),
            messageText = document.createElement('div'),
            messageImage = document.createElement('div');
        messageContainer.className = 'popup-message-content';
        messageText.className = 'popup-message-text';
        messageImage.className = 'popup-message-image';
        messageContainer.appendChild(messageImage);
        messageContainer.appendChild(messageText);
        messageContainer.setAttribute('display', 'none');


        let checkoutWindow = document.querySelector('.popup-design .popup-content'),
            checkoutForm = checkoutWindow.querySelector('.popup-dialog form'),
            checkoutSubmitButton = checkoutWindow.querySelector('.button-order'),
            checkoutInputPhone = checkoutWindow.querySelector('input[name=phone]');

        let phoneCheckout = new PhoneTemplate(checkoutInputPhone, '+375 (__) ___-__-__', 6);
        checkoutWindow.appendChild(messageContainer);

        //phone validation
        checkoutSubmitButton.addEventListener('mouseover', (event) => {
            if (phoneCheckout.isValid() !== true) {
                checkoutInputPhone.focus();
                checkoutInputPhone.setCustomValidity(messages.invalidPhone.text);
            } else {
                checkoutInputPhone.setCustomValidity('');
            }
        });
        checkoutSubmitButton.addEventListener('mouseleave', (event) => {
            checkoutInputPhone.setCustomValidity('');
        });

        //text validation
        checkoutWindow.querySelector('input[name=name]').addEventListener('input',(event)=> {
            event.target.value = event.target.value.replace(/[^а-я]/gi,'');
        });
        checkoutWindow.querySelector('textarea[name=message]').addEventListener('input',(event)=> {
            event.target.value = event.target.value.replace(/[^а-я]/gi,'');
        });
        checkoutWindow.querySelector('input[name=email]').setAttribute('type', 'email');

        function resetForm() {
            modalCheckout.modalHide();
            checkoutForm.querySelectorAll('input').forEach((item) => {item.value = ''; });
            messageContainer.style.display = 'none';
            checkoutForm.style.display = 'block';
            phoneCheckout.clearField();
        }

        //ajax send
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault();

            messageImage.classList.add(messages.ajaxProcess.class);
            messageText.innerHTML = messages.ajaxProcess.text;
            messageContainer.style.display = 'block';
            checkoutForm.style.display = 'none';

            ajax.ajaxSendResponce(checkoutForm,'POST', 'server.php')
                .then(
                    responce =>  {
                        messageImage.classList.remove(messages.ajaxProcess.class);
                        messageImage.classList.add(messages.ajaxSuccess.class);
                        messageText.innerHTML = messages.ajaxSuccess.text;
                        setTimeout(() => resetForm(), 5000);
                    },error =>  {
                        messageImage.classList.remove(messages.ajaxProcess.class);
                        messageImage.classList.add(messages.ajaxError.class);
                        messageText.innerHTML = messages.ajaxError.text;
                        setTimeout(() => resetForm(), 5000);
                    }
                );
        });
    })();


    //4. ajax submit for consultation modal window
    (() => {
        //create message div block
        let messageContainer = document.createElement('div'),
            messageText = document.createElement('div'),
            messageImage = document.createElement('div');
        messageContainer.className = 'popup-message-content';
        messageText.className = 'popup-message-text';
        messageImage.className = 'popup-message-image';
        messageContainer.appendChild(messageImage);
        messageContainer.appendChild(messageText);
        messageContainer.setAttribute('display', 'none');

        let consultationWindow = document.querySelector('.popup-consultation .popup-content'),
            consultationForm = consultationWindow.querySelector('.popup-dialog form'),
            consultationSubmitButton = consultationWindow.querySelector('.button-order'),
            consultationInputPhone = consultationWindow.querySelector('input[name=phone]');
        let phoneConsultation = new PhoneTemplate(consultationInputPhone, '+375 (__) ___-__-__', 6);
        consultationWindow.appendChild(messageContainer);

        //phone validation
        consultationSubmitButton.addEventListener('mouseover', (event) => {
            if (phoneConsultation.isValid() !== true) {
                consultationInputPhone.focus();
                consultationInputPhone.setCustomValidity(messages.invalidPhone.text);
            } else {
                consultationInputPhone.setCustomValidity('');
            }
        });
        consultationSubmitButton.addEventListener('mouseleave', (event) => {
            consultationInputPhone.setCustomValidity('');
        });

        //text validation
        consultationWindow.querySelector('input[name=name]').addEventListener('input',(event)=> {
            event.target.value = event.target.value.replace(/[^а-я]/gi,'');
        });

        function resetForm() {
            modalConsultation.modalHide();
            consultationForm.querySelectorAll('input').forEach((item) => {item.value = ''; });
            messageContainer.style.display = 'none';
            consultationForm.style.display = 'block';
            phoneConsultation.clearField();
        }

        //ajax send
        consultationForm.addEventListener('submit', (event) => {
            event.preventDefault();

            messageImage.classList.add(messages.ajaxProcess.class);
            messageText.innerHTML = messages.ajaxProcess.text;
            messageContainer.style.display = 'block';
            consultationForm.style.display = 'none';

            ajax.ajaxSendResponce(consultationForm,'POST', 'server.php')
                .then(
                    responce =>  {
                        messageImage.classList.remove(messages.ajaxProcess.class);
                        messageImage.classList.add(messages.ajaxSuccess.class);
                        messageText.innerHTML = messages.ajaxSuccess.text;
                        setTimeout(() => resetForm(), 5000);
                    },error =>  {
                        messageImage.classList.remove(messages.ajaxProcess.class);
                        messageImage.classList.add(messages.ajaxError.class);
                        messageText.innerHTML = messages.ajaxError.text;
                        setTimeout(() => resetForm(), 5000);
                    }
                );
        });
    })();

});




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map