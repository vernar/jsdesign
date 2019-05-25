'use strict';

document.addEventListener("DOMContentLoaded", () => {

    //1. Modules require
    let ModalWindow = require('./ModalWindow.js'),
        AjaxRequest = require('./AjaxSend.js'),
        PhoneTemplate = require('./PhoneTemplate.js'),
        Calculator = require('./Calculator.js'),
        FilterElements = require('./FilterElements.js');

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

    // initial variables
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

    //9. Images on hover
    let imagesContainer = document.querySelector('.sizes-wrapper'),
        imageContainer = imagesContainer.querySelectorAll('.sizes-block'),
        images = imagesContainer.querySelectorAll('img');

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


