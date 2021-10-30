import { popupInfoElement } from './utilits.js'
import { popupAddElement } from './utilits.js'
import { popupCardElement } from './utilits.js'
import { cardsContainer } from './utilits.js'
import { addCard } from './card.js'
import { placeInput } from './utilits.js'
import { linkInput } from './utilits.js'
import { nameText } from './utilits.js';
import { jobText } from './utilits.js';
import { nameInput } from './utilits.js';
import { jobInput } from './utilits.js';

import { openPopup } from '../components/utilits.js';
import { closePopup } from '../components/utilits.js';

// функция обработчика клика на карточку
export const cardButtonHandler = (button) => {
  button.addEventListener('click', () => {
    openPopup(popupCardElement);
    // находим элемент, откуда взять нужную ссылку
    const cardLink = button.querySelector('.element__image').getAttribute('src');
    // находим элемент с названием карточки
    const cardTitle = button.nextElementSibling.firstElementChild;
    // находим элемент, куда надо вставить полученную ссылку
    const cardImage = popupCardElement.querySelector('.card__image');
    // находим элемент, куда надо вставить название карточки
    const cardCaption = popupCardElement.querySelector('.card__caption');
    // вставим новые значения
    cardImage.setAttribute('src', cardLink);
    cardImage.setAttribute('alt', cardTitle.textContent);
    cardCaption.textContent = cardTitle.textContent;
  });
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
export const formSubmitEditHandler = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // Вставим новые значения с помощью textContent
  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;
  // закрываем форму
  closePopup(popupInfoElement);
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
export const formSubmitAddHandler = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // добавим элемент в начало контейнера со списком
  cardsContainer.prepend(addCard(placeInput.value, linkInput.value));
  // Найдём в форме кнопку отправки
  const buttonElement = evt.target.querySelector('.form-edit__button-save');
  // закрываем форму
  closePopup(popupAddElement);
  // очищаем форму
  evt.target.reset();
  // деактивируем кнопку сабмита
  buttonElement.disabled = true;
}

// функция закрытия попапа кликом на кнопку "закрыть" и оверлей
export const closePopupButtonOverlay = (popup, evt) => {
  const isCloseButtonClicked = evt.target.classList.contains('popup__close-icon');
  const isOverlayClicked = evt.target.classList.contains(popup.classList[1]);
  if (isCloseButtonClicked || isOverlayClicked) {
    closePopup(popup);
  }
}