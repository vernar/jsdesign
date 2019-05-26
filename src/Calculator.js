'use strict';

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