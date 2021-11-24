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
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-3",
  headers: {
    authorization: "a26fb37f-3598-49d5-8eb1-77505c512d04",
    "Content-Type": "application/json",
  },
};


//находим элемент body
export const bodyElement = document.querySelector(".page");
// находим модальное окно редактирования
export const popupInfoElement = bodyElement.querySelector(".popup_option_info");
// находим модальное окно добавления
export const popupAddElement = bodyElement.querySelector(".popup_option_add");
// находим модальное окно обновления аватара
export const popupAvatarElement = bodyElement.querySelector(
  ".popup_option_avatar"
);
// Выберем элементы, куда должны быть вставлены значения полей
export const nameText = bodyElement.querySelector(".info__name");
export const jobText = bodyElement.querySelector(".info__description");
export const avatarLinkText = bodyElement.querySelector(".profile__avatar");
// находим модальное окно карточки
export const popupCardElement = bodyElement.querySelector(".popup_option_card");
// находим модальное окно удаления карточки
export const popupDeleteCard = bodyElement.querySelector(
  ".popup_option_delete-card"
);
export const formEditElement = bodyElement.querySelector('[name="edit"]');

// Находим поля формы в DOM
export const nameInput = formEditElement.querySelector('[name="firstname"]');
export const jobInput = formEditElement.querySelector('[name="description"]');

export const infoButton = bodyElement.querySelector('.info__button');

export const addButton = bodyElement.querySelector('.profile__button-add');

export const avatarButton = bodyElement.querySelector('.profile__button-avatar');



