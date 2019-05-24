'use strict';

let ModalWindow = require('./ModalWindow.js')
;
let modalDialog = new ModalWindow(
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
    ])
;