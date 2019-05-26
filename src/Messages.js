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