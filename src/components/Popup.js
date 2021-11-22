export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }
  // Метод открытия попапа
  open() {
    // добавляем класс открытия
    this._popup.classList.add("popup_opened");
    // добавляем слушателей
    this.setEventListeners();
  }

  // Метод закрытия попапа
  close() {
    this._popup.classList.remove("popup_opened");
    this.removeEventListeners();
  }

  // Метод закрытия по esc
  _handleEscClose() {
    if (evt.key === "Escape") {
      // закрыли попап
      this.close();
    }
  }

  // Метод закрытия по оверлей
  _handleOverlayClose(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      this.close();
    }
  }

  // Метод навешивания слушателей
  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose());
    this._popup.addEventListener("click", this._handleOverlayClose());
  }
  
  // Метод снятия слушателей
  removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose());
    this._popup.removeEventListener("click", this._handleOverlayClose());
  }
}
