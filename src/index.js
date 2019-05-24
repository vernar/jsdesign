'use strict';

let ModalWindow = require('./ModalWindow.js')
;
let modal = new ModalWindow(
    document.querySelector('.popup-dialog'),
    document.querySelector('.popup-design'),
    document.querySelectorAll('.button-order'),
    [
        document.querySelector('.popup-design .popup-close'),
    ]
);