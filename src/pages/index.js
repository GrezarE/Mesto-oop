import { bodyElement } from '../components/card.js';


//находим кнопку, по которой открывается модальное окно редактирования
const infoButton = bodyElement.querySelector('.info__button');
// находим модальное окно редактирования
const popupInfoElement = bodyElement.querySelector('.popup_option_info');

// находим кнопку "Сохранить" окна редактирования
const ButtonSave = popupInfoElement.querySelector('.form-edit__button-save');
// находим кнопку, по которой открывается модальное окно добавления
const addButton = bodyElement.querySelector('.profile__button-add');
// находим модальное окно добавления
const popupAddElement = bodyElement.querySelector('.popup_option_add');

// находим форму добавления карточек в DOM
const formAddElement = bodyElement.querySelector('[name="add"]');
// Находим поля формы в DOM
const placeInput = formAddElement.querySelector('[name="place"]');
const linkInput = formAddElement.querySelector('[name="link"]');
// Находим форму редактирования в DOM
const formEditElement = bodyElement.querySelector('[name="edit"]');
// Находим поля формы в DOM
const nameInput = formEditElement.querySelector('[name="firstname"]');
const jobInput = formEditElement.querySelector('[name="description"]');
// Выберем элементы, куда должны быть вставлены значения полей
const nameText = bodyElement.querySelector('.info__name');
const jobText = bodyElement.querySelector('.info__description');


// находим модальное окно карточки
const popupCardElement = bodyElement.querySelector('.popup_option_card');
















import { openPopup } from '../components/utilits.js';



import { closePopupHandlerEscape } from '../components/modal.js';

import { closePopupButtonOverlay } from '../components/modal.js';

import { formSubmitEditHandler } from '../components/modal.js';

import { formSubmitAddHandler } from '../components/modal.js';





// добавляем обработчик клика по кнопке "редактировать"
infoButton.addEventListener('click', () => {
  openPopup(popupInfoElement);
  // вставим начальные данные из профиля в поля формы
  nameInput.placeholder = nameText.textContent;
  jobInput.placeholder = jobText.textContent;
  // closePopupEscape(popupInfoElement);
  bodyElement.addEventListener('keydown', closePopupHandlerEscape);
});

// добавляем обработчик клика по кнопке "закрыть" и оверлею
popupInfoElement.addEventListener('click', (evt) => {
  closePopupButtonOverlay(popupInfoElement, evt);
});

// добавляем обработчик клика по кнопке "добавить"
addButton.addEventListener('click', () => {
  openPopup(popupAddElement);
  bodyElement.addEventListener('keydown', closePopupHandlerEscape);
});

// добавляем обработчик клика по кнопке "закрыть" и оверлею
popupAddElement.addEventListener('click', (evt) => {
  closePopupButtonOverlay(popupAddElement, evt);
});

// добавляем обработчик клика по кнопке "закрыть"
popupCardElement.addEventListener('click', (evt) => {
  closePopupButtonOverlay(popupCardElement, evt);
});

// Прикрепляем обработчик к форме редактирования: он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener('submit', formSubmitEditHandler);

// Прикрепляем обработчик к форме добавления карточек: он будет следить за событием “submit” - «отправка»
formAddElement.addEventListener('submit', formSubmitAddHandler);





import { isInitialCards } from '../components/card.js';

isInitialCards();



import { enableValidation } from '../components/validate.js';

enableValidation();