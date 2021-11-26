import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popup, handleSubmit }) {
    super({ popup });
    this.handleSubmit = handleSubmit;
    this.handleSubmit = this.handleSubmit.bind(this);
    this._submitButton = this._popup.querySelector(".form-edit__button-save");
    this._inputList = this._popup.querySelectorAll(".form-edit__item");
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", this.handleSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._popup.removeEventListener("submit", this.handleSubmit);
  }

  getInputValues() {
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

  renderLoading(isLoading, text = "Сохранить") {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = text;
    }
  }
}
