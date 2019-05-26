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