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