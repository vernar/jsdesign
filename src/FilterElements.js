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