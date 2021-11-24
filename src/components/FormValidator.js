export default class FormValidator {
  constructor({ data }, element) {
    this._data = data;
    this._element = element;
  }

  // Проверяет импуты на валидность
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Активирует и деактивирует кнопку
  _toggleButtonState() {
    if (!this._hasInvalidInput()) {
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.disabled = true;
    }
  }

  // Проверяет на ошибку и активирует функции показать/скрыть ошибки
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Убирает сообщение об ошибке
  _hideInputError(inputElement) {
    this._errorElement = this._element.querySelector(
      `#${inputElement.name}-error`
    );
    inputElement.classList.remove(this._data.inputErrorClass);
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this._data.inputErrorClass);
  }

  // Показывает сообщение об ошибке
  _showInputError(inputElement) {
    this._errorElement = this._element.querySelector(
      `#${inputElement.name}-error`
    );
    inputElement.classList.add(this._data.inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._data.inputErrorClass);
  }

  // Вешает слушатели на форму и импуты
  _setEventListeners() {
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._inputList = Array.from(
      this._element.querySelectorAll(this._data.inputSelector)
    );
    this._buttonElement = this._element.querySelector(
      this._data.submitButtonSelector
    );

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Запускает валидацию
  enableValidation() {
    this._setEventListeners(this._element, this._data);
  }
}
