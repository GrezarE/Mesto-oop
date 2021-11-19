// Объект селекторов для валидации
export const configValid = {
  inputSelector: ".form-edit__item",
  submitButtonSelector: ".form-edit__button-save",
  inputErrorClass: ".form-edit__item_error",
};

// Находим массив всех форм
export const formList = Array.from(document.querySelectorAll(".form-edit"));
