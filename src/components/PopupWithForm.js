import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popup, renderer }) {
    super({ popup });
    this.renderer = renderer;
  }
  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener("submit", () => {});
  }
  removeEventListeners() {
    super.removeEventListeners();
    this.popup.removeEventListener("submit", () => {});
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
