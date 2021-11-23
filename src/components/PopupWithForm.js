import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popup, renderer }) {
    super({ popup });
    this.renderer = renderer;
    this.renderer = this.renderer.bind(this);
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", this.renderer);
  }
  removeEventListeners() {
    super.removeEventListeners();
    this._popup.removeEventListener("submit", this.renderer);
  }
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".form-edit__item");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }
  close() {
    super.close();
    this._popup.querySelector(".form__box").reset();
  }
}
