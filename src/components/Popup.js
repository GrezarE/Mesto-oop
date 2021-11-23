export default class Popup {
  constructor({ popup }) {
    this._popup = popup;
    this.escClose = this._handleEscClose.bind(this)
    this.overlayClose = this._handleOverlayClose.bind(this)
  }
  // Метод открытия попапа
  open() {
    // добавляем класс открытия
    this._popup.classList.add("popup_opened");
    console.log(this._popup);

    // добавляем слушателей
    this.setEventListeners();
  }

  // Метод закрытия попапа
  close() {
    this._popup.classList.remove("popup_opened");
    this.removeEventListeners();
  }

  // Метод закрытия по esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      // закрыли попап
      this.close();
    }
  }

  // Метод закрытия по оверлей
  _handleOverlayClose(evt) {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close-icon")
    ) {
      this.close();
    }
  }

  // Метод навешивания слушателей
  setEventListeners() {
    document.addEventListener("keydown", this.escClose);
    this._popup.addEventListener("click", this.overlayClose);
  }

  // Метод снятия слушателей
  removeEventListeners() {
    document.removeEventListener("keydown", this.escClose);
    this._popup.removeEventListener("click", this.overlayClose);
  }
}
