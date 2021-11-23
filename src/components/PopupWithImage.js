import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor({ popup, card }) {
    // Забираем параметры из родителя
    super({ popup });
    // Данные карточки
    this._card = card;
  }

  open() {
    // Забираем параметры из родителя
    super.open();
    // Выставляем данные картинки
    this._popup.querySelector(".card__image").src = this._card.link;
    this._popup.querySelector(".card__image").alt = this._card.name;
    // ВЫставляем имя карточки
    this._popup.querySelector(".card__caption").textContent = this._card.name;
  }
}
