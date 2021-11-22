// Объект селекторов для валидации
export const configValid = {
  inputSelector: ".form-edit__item",
  submitButtonSelector: ".form-edit__button-save",
  inputErrorClass: ".form-edit__item_error",
};

// Находим массив всех форм
export const formList = Array.from(document.querySelectorAll(".form-edit"));

// Объект данных для запросов
export const configApi = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-3',
  headers: {
    authorization: 'a26fb37f-3598-49d5-8eb1-77505c512d04',
    'Content-Type': 'application/json'
  }
}
