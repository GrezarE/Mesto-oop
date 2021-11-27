import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popup }) {
    // Забираем параметры из родителя
    super({ popup });
    this._cardItem = this._popup.querySelector(".card__image");
  }

  open(item) {
    // Забираем параметры из родителя
    super.open();
    // Выставляем данные картинки
    this._cardItem.src = item.link;
    this._cardItem.alt = item.name;
    // ВЫставляем имя карточки
    this._popup.querySelector(".card__caption").textContent = item.name;
  }
}
