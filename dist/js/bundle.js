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

/***/ "./src/Accordion.js":
/*!**************************!*\
  !*** ./src/Accordion.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Accordion {
    constructor(parentElement, buttons, notes) {
        this.parentElement = parentElement;
        this.buttons = buttons;
        this.notes = notes;
        this.fadeInClass = 'fadeInDown';
        this.fadeOutClass = 'fadeOutUp';

        this.buttonActiveClass = 'ui-accordion-header-active';

        this.resetElements();
        this._init();
    }
    resetElements(exceptionElementNumber) {
        this.buttons.forEach((element) => {
            if (typeof exceptionElementNumber !== "undefined" && element === this.buttons[exceptionElementNumber]) {
                return;
            }
            element.classList.remove(this.buttonActiveClass);
        });

        this.notes.forEach((element) => {
            if (typeof exceptionElementNumber !== "undefined" && element === this.notes[exceptionElementNumber]) {
                return;
            }
            element.classList.remove(this.fadeInClass);
            element.classList.remove(this.fadeOutClass);
            element.classList.add(this.fadeOutClass);
            setTimeout(() => {
                element.style.display = 'none';
                element.classList.remove(this.fadeOutClass);
            }, 600);
        });
    }

    _init() {
        this.notes.forEach((element) => element.style.display = 'none');
        this.buttons.forEach((element, number) => {
            element.addEventListener('click', (event) => {
                this.resetElements(number);
                if (this.buttons[number].classList.contains(this.buttonActiveClass)) {
                    this.buttons[number].classList.remove(this.buttonActiveClass);
                    this.notes[number].classList.remove(this.fadeInClass);
                    this.notes[number].classList.remove(this.fadeOutClass);
                    this.notes[number].classList.add(this.fadeOutClass);
                    setTimeout(() => {
                        this.notes[number].style.display = 'none';
                        this.notes[number].classList.remove(this.fadeOutClass);
                    }, 400);
                } else {
                    this.buttons[number].classList.add(this.buttonActiveClass);
                    this.notes[number].style.display = 'block';
                    this.notes[number].classList.remove(this.fadeInClass);
                    this.notes[number].classList.add(this.fadeInClass);
                }
            });
        });
    }
}
module.exports = Accordion;


/*
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.fadeInDown {
    animation-name: fadeInDown;
    -webkit-animation-duration: 1.0s;
    animation-duration: 1.0s;
    -webkit-animation-duration: 1.0s;
}


@keyframes fadeOutUp {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
}

.fadeOutUp {
    animation-name: fadeOutUp;
    -webkit-animation-duration: 1.0s;
    animation-duration: 1.0s;
    -webkit-animation-duration: 1.0s;
}
 */

/***/ }),

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

/***/ "./src/Calculator.js":
/*!***************************!*\
  !*** ./src/Calculator.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class Calculator {
    constructor(selectorObjects, buttonCalculate, outputField, startText, canSummBonusAmound = false) {
        this.selectorObjects = selectorObjects;
        this.buttonCalculate = buttonCalculate;
        this.outputField = outputField;
        this.startText = startText;
        this.totalPrice = '';
        this.totalBonus = [];
        this.canSummBonusAmound = canSummBonusAmound;

        this._initCalculator();
    }

    addBonusCode(inputElement, code, bonusValue, isPercent = false) {
        inputElement.addEventListener('input', (event) => {
            if (event.target.value.replace(/\s/g, '') === code) {
                this.totalBonus[code] = {
                    bonusValue: bonusValue,
                    isPercent: isPercent
                };
            } else if (this.canSummBonusAmound === false) {
                delete this.totalBonus[code];
            }
            this._calculate();
        });
    }

    getCurrentBonus() {
        let bonusInPercent = 0,
            bonusInValue = 0,
            bonusTotal = 0;

        for(let key in this.totalBonus){
            if (this.totalBonus.hasOwnProperty(key)) {
                let item = this.totalBonus[key];
                if (item.isPercent === true) {
                    bonusInPercent += +item.bonusValue;
                } else {
                    bonusInValue += +item.bonusValue;
                }
            }
        }
        bonusInPercent = bonusInPercent > 100 ? 100 : bonusInPercent;
        bonusTotal = (this.totalPrice / 100 * bonusInPercent) + bonusInValue;
        return bonusTotal;
    }

    _calculate() {
        this.totalPrice = 0;
        let isPassed = true;

        this.selectorObjects.forEach((item) => {
            let element = item.element;

            if (item.isRequire === true &&
                (typeof element.options[element.selectedIndex].value === undefined ||
                +element.options[element.selectedIndex].value === 0 ||
                element.options[element.selectedIndex].value === '')
            ){
                element.setCustomValidity(item.errorMessage);
                isPassed = false;
            } else {
                element.setCustomValidity('');
                this.totalPrice += +element.options[element.selectedIndex].value;
            }
        });

        if (isPassed === true) {
            let discountText = this.getCurrentBonus() > 0 ? ' Ваша скидка: ' + this.getCurrentBonus() : '';
            this.outputField.innerHTML = (this.totalPrice - this.getCurrentBonus()) + discountText;
        } else {
            this.outputField.innerHTML = this.startText;
        }
    }

    _initCalculator() {
        this.outputField.innerHTML = this.startText;
        this.selectorObjects.forEach((item) => {
            if (item.element.tagName === 'SELECT') {
                for (let numb = 0; numb <  item.priceScope.length; numb++) {
                    item.element.options[numb].value = item.priceScope[numb];
                }
            }
            if (item.isTrigger === true) {
                let eventType = item.element.tagName === 'SELECT' ? 'change' : 'input';
                item.element.addEventListener(eventType, (event) => {
                    this._calculate();
                    if (event.target.tagName === 'INPUT') {
                        event.target.value = event.target.value.replace(/^0|[^\d]/g, '');
                    }
                });
            }

            if (this.buttonCalculate !== null) {
                this.buttonCalculate.addEventListener('click', (event) => {
                    this._calculate();
                });
            }
        });
    }
}
module.exports = Calculator;

/***/ }),

/***/ "./src/FilterElements.js":
/*!*******************************!*\
  !*** ./src/FilterElements.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

class FilterElements {
    constructor(ButtonContainer, elementsContainer, activeButtonClass = 'active') {
        this.buttonContainer = ButtonContainer;
        this.elementsContainer = elementsContainer;
        this.activeButtonClass = activeButtonClass;

        this._init();
    }

    _init() {
        this.buttonContainer.addEventListener('click', (event) => {
            Array.from(this.buttonContainer.children).forEach((element) => {
                if (element === event.target){
                    element.classList.add(this.activeButtonClass);
                } else {
                    element.classList.remove(this.activeButtonClass);
                }
            });
            let isNoFoundAny = true;
            event.target.classList.forEach((className) => {
                Array.from(this.elementsContainer.children).forEach((element) => {
                    if (className === this.activeButtonClass) {
                        return;
                    }

                    if(element.classList.contains(className)) {
                        element.style.display = 'block';
                        isNoFoundAny = false;
                    } else {
                        element.style.display = 'none';
                    }
                });
            });
            document.querySelector('.portfolio-no').style.display = isNoFoundAny === true ? 'block' : 'none';
        });
    }
}
module.exports = FilterElements;

/***/ }),

/***/ "./src/Messages.js":
/*!*************************!*\
  !*** ./src/Messages.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Messages {
    constructor(){
        this.messages = {
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
        };

        this._init();
    }
    _init() {
        let messageContainer = document.createElement('div'),
            messageText = document.createElement('div'),
            messageImage = document.createElement('div');
        messageContainer.className = 'popup-message-content';
        messageText.id = 'popup-message-text';
        messageImage.id = 'popup-message-image';
        messageContainer.appendChild(messageImage);
        messageContainer.appendChild(messageText);
        messageContainer.style.display = 'none';

        this.messageContainer = messageContainer;
        this.messageText = messageText;
        this.messageImage = messageImage;
    }

    getMessageContainer() {
        return this.messageContainer;
    }

    setMessageToProcess() {
        this.messageImage.className = this.messages.ajaxProcess.class;
        this.messageText.innerHTML = this.messages.ajaxProcess.text;
    }

    setMessageToSuccess() {
        this.messageImage.className = this.messages.ajaxSuccess.class;
        this.messageText.innerHTML = this.messages.ajaxSuccess.text;
    }

    setMessageToError() {
        this.messageImage.className = this.messages.ajaxError.class;
        this.messageText.innerHTML = this.messages.ajaxError.text;
    }
}
module.exports = Messages;

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

    isOpen() {
        if (this.overlay.style.display === 'block') {
            return true;
        }
        return false;
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

/***/ "./src/Slider.js":
/*!***********************!*\
  !*** ./src/Slider.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
let sliderElements = {
    sliderContainer: document.querySelector(''),
    sliders: document.querySelectorAll(''),
    prev: document.querySelector(''),
    next: document.querySelector(''),
    dotsWrap: document.querySelector(''),
    fromLeftClass: 'fadeInLeftBig',
    fromRightClass: 'fadeInRightBig',
    toLeftClass: 'fadeOutLeftBig',
    toRightClass: 'fadeOutRightBig',
    animationTimeout: 1000,
    slideInterval: 10000,
};
 */


class Slider {
    constructor(sliderElements) {
        //slider
        this.sliderContainer = sliderElements.sliderContainer;
        this.slides = sliderElements.sliders;
        this.prev = sliderElements.prev;
        this.next = sliderElements.next;
        this.dotsWrap = sliderElements.dotsWrap;
        this.fromLeftClass = typeof sliderElements.fromLeftClass === "undefined" ? 'empty' : sliderElements.fromLeftClass;
        this.fromRightClass = typeof sliderElements.fromRightClass === "undefined" ? 'empty' : sliderElements.fromRightClass;
        this.toLeftClass = typeof sliderElements.toLeftClass === "undefined" ? 'empty' : sliderElements.toLeftClass;
        this.toRightClass = typeof sliderElements.toRightClass === "undefined" ? 'empty' : sliderElements.toRightClass;
        this.animationTimeout = typeof sliderElements.animationTimeout === "undefined" ? 1000 : sliderElements.animationTimeout;
        this.slideInterval = typeof sliderElements.slideInterval === "undefined" ? 10000 : sliderElements.slideInterval;

        this.startIndex = 0;
        this.currentIndex = 0;
        this.pauseByTimeOut = false;

        this.initSlider(this.startIndex);
    }

    nextSlide(){
        let currentIndex = this.currentIndex,
            nextIndex = this.currentIndex >= this.slides.length - 1 ? 0 : this.currentIndex + 1;

        this.slides[currentIndex].classList.add(this.toLeftClass);
        this.slides[nextIndex].classList.add(this.fromRightClass);
        this.slides[nextIndex].style.display = 'block';

        setTimeout(() => {
            this.slides[currentIndex].style.display = 'none';
            this.slides[currentIndex].classList.remove(this.toLeftClass);
            this.slides[nextIndex].classList.remove(this.fromRightClass);
        }, this.animationTimeout);

        this.currentIndex = nextIndex;
    }

    prevSlide(){
        let currentIndex = this.currentIndex,
            nextIndex = this.currentIndex <= 0 ? this.slides.length - 1 : this.currentIndex - 1;

        this.slides[currentIndex].classList.add(this.toRightClass);
        this.slides[nextIndex].classList.add(this.fromLeftClass);
        this.slides[nextIndex].style.display = 'block';

        setTimeout(() => {
            this.slides[currentIndex].style.display = 'none';
            this.slides[currentIndex].classList.remove(this.toRightClass);
            this.slides[nextIndex].classList.remove(this.fromLeftClass);
        }, this.animationTimeout);

        this.currentIndex = nextIndex;
    }

    _intervalTrigger(){
        if (this.pauseByTimeOut === false) {
            this.nextSlide();
        }
    }

    initSlider(startIndex = 0) {
        this.slides.forEach((item) => item.style.display = 'none');

        this.slides[startIndex].style.display = 'block';
        this.slides[startIndex].classList.add(this.fromRightClass);
        setTimeout(() => this.slides[startIndex].classList.remove(this.fromRightClass), this.animationTimeout);
        this.currentIndex = startIndex;

        setInterval(() => this._intervalTrigger() , this.slideInterval);

        if (typeof this.next !== "undefined"){
            this.next.addEventListener('click', () => {
                this.nextSlide();
                this.pauseByTimeOut = true;
                setTimeout(() => this.pauseByTimeOut = false, 10000 );
            });
        }

        if (typeof this.prev !== "undefined"){
            this.prev.addEventListener('click', () => {
                this.prevSlide();
                this.pauseByTimeOut = true;
                setTimeout(() => this.pauseByTimeOut = false, 10000 );
            });
        }
    }
}
module.exports = Slider;

/*
.fadeInLeftBig {
    -webkit-animation-name: fadeInLeftBig;
    animation-name: fadeInLeftBig;
    -webkit-animation-duration: 1.0s;
    animation-duration: 1.0s;
    -webkit-animation-name: fadeInLeftBig;
    -webkit-animation-duration: 1.0s;
}

@-webkit-keyframes fadeInLeftBig {
    from {
        opacity: 0;
        -webkit-transform: translate3d(-2000px, 0, 0);
        transform: translate3d(-2000px, 0, 0);
    }

    to {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

@keyframes fadeInLeftBig {
    from {
        opacity: 0;
        -webkit-transform: translate3d(-2000px, 0, 0);
        transform: translate3d(-2000px, 0, 0);
    }

    to {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}
.fadeInRightBig {
    -webkit-animation-name: fadeInRightBig;
    animation-name: fadeInRightBig;
    -webkit-animation-duration: 1.0s;
    animation-duration: 1.0s;
    -webkit-animation-name: fadeInRightBig;
    -webkit-animation-duration: 1.0s;


}
@-webkit-keyframes fadeInRightBig {
    from {
        opacity: 0;
        -webkit-transform: translate3d(2000px, 0, 0);
        transform: translate3d(2000px, 0, 0);
    }

    to {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

@keyframes fadeInRightBig {
    from {
        opacity: 0;
        -webkit-transform: translate3d(2000px, 0, 0);
        transform: translate3d(2000px, 0, 0);
    }

    to {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}
.fadeOutRightBig {
    -webkit-animation-name: fadeOutRightBig;
    animation-name: fadeOutRightBig;
    -webkit-animation-duration: 1.0s;
    animation-duration: 1.0s;
    -webkit-animation-name: fadeOutRightBig;
    -webkit-animation-duration: 1.0s;
}

@-webkit-keyframes fadeOutRightBig {
    from {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(2000px, 0, 0);
        transform: translate3d(2000px, 0, 0);
    }
}
@keyframes fadeOutRightBig {
    from {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(2000px, 0, 0);
        transform: translate3d(2000px, 0, 0);
    }
}
.fadeOutLeftBig {
    -webkit-animation-name: fadeOutLeftBig;
    animation-name: fadeOutLeftBig;
    -webkit-animation-duration: 1.0s;
    animation-duration: 1.0s;
    -webkit-animation-name: fadeOutLeftBig;
    -webkit-animation-duration: 1.0s;
}
@-webkit-keyframes fadeOutLeftBig {
    from {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(-2000px, 0, 0);
        transform: translate3d(-2000px, 0, 0);
    }
}
@keyframes fadeOutLeftBig {
    from {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(-2000px, 0, 0);
        transform: translate3d(-2000px, 0, 0);
    }
}
 */

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener("DOMContentLoaded", () => {

    //1. Modules require
    let ModalWindow = __webpack_require__(/*! ./ModalWindow.js */ "./src/ModalWindow.js"),
        AjaxRequest = __webpack_require__(/*! ./AjaxSend.js */ "./src/AjaxSend.js"),
        PhoneTemplate = __webpack_require__(/*! ./PhoneTemplate.js */ "./src/PhoneTemplate.js"),
        Calculator = __webpack_require__(/*! ./Calculator.js */ "./src/Calculator.js"),
        FilterElements = __webpack_require__(/*! ./FilterElements.js */ "./src/FilterElements.js"),
        Slider = __webpack_require__(/*! ./Slider.js */ "./src/Slider.js"),
        Accordion = __webpack_require__(/*! ./Accordion.js */ "./src/Accordion.js"),
        Messages = __webpack_require__(/*! ./Messages.js */ "./src/Messages.js");

    // initial variables
    let ajax = new AjaxRequest();

    let messages = {
        invalidPhone: {
            text: 'Заполните поле телефона'
        }
    };

    //2. Modal popups
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

    //16. main Slider

    let mainSlider = new Slider({
        sliderContainer: document.querySelector('.main-slider'),
        sliders: document.querySelectorAll('.main-slider-item'),
        slideInterval: 5000,
        fromRightClass: 'fadeInDown',
        toLeftClass: 'fadeOutDown',
        animationTimeout: 900,
    });

    //15. hamburger menu
    let hamburgerMenu = document.querySelector('.burger-menu'),
        hamburgerButton = document.querySelector('.burger');

    function isTablet() {
        if(document.documentElement.clientWidth  <= 768) {
            return true;
        }
        return false;
    }
    window.addEventListener('resize', () => {
        if (isTablet() === true) {
            hamburgerMenu.style.display = 'none';
        }
    });
    hamburgerButton.addEventListener('click', () => {
        if (isTablet() === true) {
            hamburgerMenu.style.display = hamburgerMenu.style.display === 'none' ? 'block' : 'none';
        }
    });

    //14. 60 seconds to modal
    setTimeout(() =>{
        if (! (modalCheckout.isOpen() || modalConsultation.isOpen() || modalGift.isOpen())) {
            modalConsultation.modalShow();
        }
    }, 60000);

    //5.gift
    //13. show modal window if list to bottom page
    let allButtons = document.querySelectorAll('button'),
        isClickAnyButton = false,
        isShowGift = false,
        giftIcon = document.querySelector('.fixed-gift');

    let giftTimer = setTimeout(() => {
        giftIcon.style.display = 'block';
    },3000);
    giftIcon.addEventListener('click', () => {
        giftIcon.style.display = 'none';
    });

    allButtons.forEach((button) => button.addEventListener('click',() => {
        isClickAnyButton = true;
    }));

    window.addEventListener('scroll', () => {
        let documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight - 100,
            currentScroll  = document.documentElement.scrollTop;
        if (currentScroll >= documentHeight && isShowGift === false && isClickAnyButton === false) {
            clearTimeout(giftTimer);
            giftIcon.style.display = 'none';
            modalGift.modalShow();
            isShowGift = true;
        }
    });

    //12 main form
    (() => {
        //create message div block
        let messageObject = new Messages(),
            messageContainer = messageObject.getMessageContainer();

        let mainContainer = document.querySelector('.consultation .container'),
            mainForm = document.querySelector('.consultation form'),
            mainSubmitButton = mainForm.querySelector('.button-order'),
            checkoutInputPhone = mainForm.querySelector('input[name=phone]');

        let phoneMainForm = new PhoneTemplate(checkoutInputPhone, '+375 (__) ___-__-__', 6);
        messageContainer.style.marginLeft = '35%';
        mainContainer.appendChild(messageContainer);

        //phone validation
        mainSubmitButton.addEventListener('mouseover', (event) => {
            if (phoneMainForm.isValid() !== true) {
                checkoutInputPhone.focus();
                checkoutInputPhone.setCustomValidity(messages.invalidPhone.text);
            } else {
                checkoutInputPhone.setCustomValidity('');
            }
        });
        mainSubmitButton.addEventListener('mouseleave', (event) => {
            checkoutInputPhone.setCustomValidity('');
        });

        //text validation
        mainForm.querySelector('input[name=name]').addEventListener('input',(event)=> {
            event.target.value = event.target.value.replace(/[^а-яё]/gi,'');
        });
        mainForm.querySelector('input[name=message]').addEventListener('input',(event)=> {
            event.target.value = event.target.value.replace(/[^а-яё]/gi,'');
        });
        mainForm.querySelector('input[name=email]').setAttribute('type', 'email');

        function resetForm() {
            mainForm.querySelectorAll('input').forEach((item) => {item.value = ''; });
            messageContainer.style.display = 'none';
            mainForm.style.display = 'block';
            phoneMainForm.clearField();
        }

        //ajax send
        mainForm.addEventListener('submit', (event) => {
            event.preventDefault();

            messageObject.setMessageToProcess();
            messageContainer.style.display = 'block';
            mainForm.style.display = 'none';

            ajax.ajaxSendResponce(mainForm,'POST', 'server.php')
                .then(
                    responce =>  {
                        messageObject.setMessageToSuccess();
                        setTimeout(() => resetForm(), 5000);
                    },error =>  {
                        messageObject.setMessageToError();
                        setTimeout(() => resetForm(), 5000);
                    }
                );
        });
    })();
    
    //11. Accordion
    let accordion = new Accordion(
        document.querySelector('#accordion'),
        document.querySelectorAll('#accordion .accordion-heading'),
        document.querySelectorAll('#accordion div')
    );

    //10. bottom Slider
    let slider = new Slider({
        sliderContainer: document.querySelector('.feedback-slider'),
        sliders: document.querySelectorAll('.feedback-slider-item'),
        prev: document.querySelector('.main-prev-btn'),
        next: document.querySelector('.main-next-btn'),
        slideInterval: 5000,
        fromLeftClass: 'fadeInLeftBig',
        fromRightClass: 'fadeInRightBig',
        toLeftClass: 'fadeOutLeftBig',
        toRightClass: 'fadeOutRightBig',
    });

    //9. Images on hover
    let imagesContainer = document.querySelector('.sizes-wrapper'),
        imageContainer = imagesContainer.querySelectorAll('.sizes-block');

    function shoveImage(item) {
        let image = item.querySelector('img'),
            index = image.src.match(/-[\d]/)[0],
            other = item.querySelectorAll('p');
        image.src = `img/sizes${index}-1.png`;
        other.forEach((item) => item.style.display = item.classList.contains('sizes-hit') ? 'block' : 'none');
    }

    function hideImage(item) {
        let image = item.querySelector('img'),
            index = image.src.match(/-[\d]/)[0],
            other = item.querySelectorAll('p');
        image.src = `img/sizes${index}.png`;
        other.forEach((item) => item.style.display = 'block');
    }

    imageContainer.forEach((item) => {
        item.addEventListener('mouseover', () => shoveImage(item));
        item.addEventListener('mouseleave', () => hideImage(item));
        item.addEventListener('touchstart', () => shoveImage(item));
        item.addEventListener('touchleave', () => hideImage(item));
    });

    
    //8. Filter Elements
    let filterElements = new FilterElements(
        document.querySelector('.portfolio-menu'),
        document.querySelector('.portfolio-wrapper')
    );

    //7. Calculator
    let calculatorSection = document.querySelector('.calc');
    let calculatorObject  = [
        {
            element: calculatorSection.querySelector('#size'),
            priceScope: [0, 1000, 1500, 2000, 2500],
            isTrigger: true,
            isRequire: true,
            errorMessage: 'Не выбран размер',
        },
        {
            element: calculatorSection.querySelector('#material'),
            priceScope: [0, 1000, 2000, 3000],
            isTrigger: true,
            isRequire: true,
            errorMessage: 'Не выбран материал',
        },
        {
            element: calculatorSection.querySelector('#options'),
            priceScope: [0, 1000, 3000, 3000],
            isTrigger: true,
            isRequire: false,
        },
    ];

    let calculator = new Calculator(
        calculatorObject,
        calculatorSection.querySelector('.button-order'),
        calculatorSection.querySelector('.calc-price'),
        'Для расчета нужно выбрать размер картины и материал картины'
    );
    calculator.addBonusCode(
        calculatorSection.querySelector('.promocode'),
        'IWANTPOPART',
        30,
        true
    );
    calculatorSection.querySelector('form').addEventListener('submit', (event) => {event.preventDefault();});


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

    //4.ajax submit for checkout modal window
    (() => {
        //create message div block
        let messageObject = new Messages(),
            messageContainer = messageObject.getMessageContainer();

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
            event.target.value = event.target.value.replace(/[^а-яё]/gi,'');
        });
        checkoutWindow.querySelector('textarea[name=message]').addEventListener('input',(event)=> {
            event.target.value = event.target.value.replace(/[^а-яё]/gi,'');
        });
        checkoutWindow.querySelector('input[name=email]').setAttribute('type', 'email');

        function resetForm() {
            modalCheckout.modalHide();
            checkoutForm.querySelectorAll('input').forEach((item) => {item.value = ''; });
            checkoutWindow.querySelector('textarea[name=message]').value = '';
            messageContainer.style.display = 'none';
            checkoutForm.style.display = 'block';
            phoneCheckout.clearField();
        }

        //ajax send
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault();

            messageObject.setMessageToProcess();
            messageContainer.style.display = 'block';
            checkoutForm.style.display = 'none';

            ajax.ajaxSendResponce(checkoutForm,'POST', 'server.php')
                .then(
                    responce =>  {
                        messageObject.setMessageToSuccess();
                        setTimeout(() => resetForm(), 5000);
                    },error =>  {
                        messageObject.setMessageToError();
                        setTimeout(() => resetForm(), 5000);
                    }
                );
        });
    })();


    //4. ajax submit for consultation modal window
    (() => {
        //create message div block
        let messageObject = new Messages(),
            messageContainer = messageObject.getMessageContainer();

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
            event.target.value = event.target.value.replace(/[^а-яё]/gi,'');
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

            messageObject.setMessageToProcess();
            messageContainer.style.display = 'block';
            consultationForm.style.display = 'none';

            ajax.ajaxSendResponce(consultationForm,'POST', 'server.php')
                .then(
                    responce =>  {
                        messageObject.setMessageToSuccess();
                        setTimeout(() => resetForm(), 5000);
                    },error =>  {
                        messageObject.setMessageToError();
                        setTimeout(() => resetForm(), 5000);
                    }
                );
        });
    })();

});




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map