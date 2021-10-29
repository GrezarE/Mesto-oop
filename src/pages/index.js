import { bodyElement } from '../components/utilits.js';
import { popupInfoElement } from '../components/utilits.js';
import { popupAddElement } from '../components/utilits.js';
import { popupCardElement } from '../components/utilits.js';
import { formAddElement } from '../components/utilits.js';
import { nameText } from '../components/utilits.js';
import { jobText } from '../components/utilits.js';
import { formEditElement } from '../components/utilits.js';
import { nameInput } from '../components/utilits.js';
import { jobInput } from '../components/utilits.js';
import { infoButton } from '../components/utilits.js';
import { addButton } from '../components/utilits.js';

import { openPopup } from '../components/utilits.js';

import { closePopupHandlerEscape } from '../components/modal.js';
import { closePopupButtonOverlay } from '../components/modal.js';
import { formSubmitEditHandler } from '../components/modal.js';
import { formSubmitAddHandler } from '../components/modal.js';

import { isInitialCards } from '../components/card.js';
import { enableValidation } from '../components/validate.js';


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

isInitialCards();

enableValidation();