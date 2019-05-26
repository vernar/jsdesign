'use strict';
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
        this.fromLeftClass = typeof sliderElements.fromLeftClass === "undefined" ? 'fadeInLeftBig' : sliderElements.fromLeftClass;
        this.fromRightClass = typeof sliderElements.fromRightClass === "undefined" ? 'fadeInRightBig' : sliderElements.fromRightClass;
        this.toLeftClass = typeof sliderElements.toLeftClass === "undefined" ? 'fadeOutLeftBig' : sliderElements.toLeftClass;
        this.toRightClass = typeof sliderElements.toRightClass === "undefined" ? 'fadeOutRightBig' : sliderElements.toRightClass;
        this.animationTimeout = typeof sliderElements.animationTimeout === "undefined" ? 1000 : sliderElements.animationTimeout;
        this.slideInterval = typeof sliderElements.slideInterval === "undefined" ? 10000 : sliderElements.slideInterval;

        this.startIndex = 0;
        this.currentIndex = 0;

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

    initSlider(startIndex = 0) {
        this.slides.forEach((item) => item.style.display = 'none');

        this.slides[startIndex].style.display = 'block';
        this.slides[startIndex].classList.add(this.fromRightClass);
        setTimeout(() => this.slides[startIndex].classList.remove(this.fromRightClass), this.animationTimeout);
        this.currentIndex = startIndex;

        let autoSlide = setInterval(() => this.nextSlide(), this.slideInterval);

        this.next.addEventListener('click', () => {
            this.nextSlide();
            clearInterval(autoSlide);
            setInterval(() => autoSlide = setInterval(() => this.nextSlide(), this.slideInterval), 10000 );
        });
        this.prev.addEventListener('click', () => {
            this.prevSlide();
            clearInterval(autoSlide);
            setInterval(() => autoSlide = setInterval(() => this.nextSlide(), this.slideInterval), 10000 );
        });
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