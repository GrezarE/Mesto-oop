import './index.css'; // добавьте импорт главного файла стилей

import { popupInfoElement } from '../components/utilits.js';
import { popupAddElement } from '../components/utilits.js';
import { popupCardElement } from '../components/utilits.js';
import { popupDeleteCard } from '../components/utilits.js';
import { popupAvatarElement } from '../components/utilits.js';
import { formAddElement } from '../components/utilits.js';
import { nameText } from '../components/utilits.js';
import { jobText } from '../components/utilits.js';
import { formEditElement } from '../components/utilits.js';
import { nameInput } from '../components/utilits.js';
import { jobInput } from '../components/utilits.js';
import { infoButton } from '../components/utilits.js';
import { addButton } from '../components/utilits.js';
import { formAvatarElement } from '../components/utilits.js';
import { avatarButton } from '../components/utilits.js';
import { openPopup } from '../components/utilits.js';
import { closePopupButtonOverlay } from '../components/modal.js';
import { formSubmitEditHandler } from '../components/modal.js';
import { formSubmitAddHandler } from '../components/modal.js';
import { formSubmitUpdateAvatarHandler } from '../components/modal.js';
import { enableValidation } from '../components/validate.js';


// добавляем обработчик клика по кнопке "редактировать"
infoButton.addEventListener('click', () => {
  openPopup(popupInfoElement);
  // вставим начальные данные из профиля в поля формы
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
});

// добавляем обработчик клика по кнопке "закрыть" и оверлею формы редактирования профиля
popupInfoElement.addEventListener('click', (evt) => {
  closePopupButtonOverlay(popupInfoElement, evt);
});

// добавляем обработчик клика по кнопке "добавить"
addButton.addEventListener('click', () => {
  openPopup(popupAddElement);
});

// добавляем обработчик клика по кнопке "закрыть" и оверлею формы добавления карточки
popupAddElement.addEventListener('click', (evt) => {
  closePopupButtonOverlay(popupAddElement, evt);
});

// добавляем обработчик клика по кнопке "закрыть" попапа карточки
popupCardElement.addEventListener('click', (evt) => {
  closePopupButtonOverlay(popupCardElement, evt);
});

// добавляем обработчик клика по кнопке "закрыть" формы удаления карточек
popupDeleteCard.addEventListener('click', (evt) => {
  closePopupButtonOverlay(popupDeleteCard, evt);
});

// добавляем обработчик клика по кнопке "аватар"
avatarButton.addEventListener('click', () => {
  openPopup(popupAvatarElement);
});

// добавляем обработчик клика по кнопке "закрыть" и оверлею формы редактирования профиля
popupAvatarElement.addEventListener('click', (evt) => {
  closePopupButtonOverlay(popupAvatarElement, evt);
});

// Прикрепляем обработчик к форме редактирования: он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener('submit', formSubmitEditHandler);

// Прикрепляем обработчик к форме добавления карточек: он будет следить за событием “submit” - «отправка»
formAddElement.addEventListener('submit', formSubmitAddHandler);

// Прикрепляем обработчик к форме обновления аватара: он будет следить за событием “submit” - «отправка»
formAvatarElement.addEventListener('submit', formSubmitUpdateAvatarHandler);

enableValidation({
  formSelector: '.form-edit',
  inputSelector: '.form-edit__item',
  submitButtonSelector: '.form-edit__button-save',
  inputErrorClass: 'form-edit__item_error',
});


import { getUserInfo } from '../components/api.js';
// getUserInfo()
//   .then((result) => {
//     // обрабатываем результат
//   })
//   .catch((err) => {
//     console.log(err); // выводим ошибку в консоль
//   });

import { getInitialCards } from '../components/api.js';
// getInitialCards()
//   .then((result) => {
//     // обрабатываем результат
//   })
//   .catch((err) => {
//     console.log(err); // выводим ошибку в консоль
//   });


Promise.all([getUserInfo(), getInitialCards()])
  .then((result) => {
    // обрабатываем результат
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
