import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popup }) {
    // Забираем параметры из родителя
    super({ popup });
  }

  open(item) {
    // Забираем параметры из родителя
    super.open();
    // Выставляем данные картинки
    this._popup.querySelector(".card__image").src = item.link;
    this._popup.querySelector(".card__image").alt = item.name;
    // ВЫставляем имя карточки
    this._popup.querySelector(".card__caption").textContent = item.name;
  }
}
