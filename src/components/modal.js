import { popupAvatarElement, popupInfoElement } from './utilits.js'
import { popupAddElement } from './utilits.js'
import { popupCardElement } from './utilits.js'
import { popupDeleteCard } from './utilits.js'
import { formDeleteElement } from './utilits.js'
import { placeInput } from './utilits.js'
import { linkInput } from './utilits.js'
import { avatarLinkInput } from './utilits.js';
import { nameInput } from './utilits.js';
import { jobInput } from './utilits.js';
import { openPopup } from './utilits.js';
import { closePopup } from './utilits.js';
import { renderLoading } from './utilits.js';
import { getUserInfo } from './api.js';
import { editProfileInfo } from './api.js';
import { createCard } from './api.js';
import { deleteCard } from './api.js';
import { updateAvatar} from './api.js';

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

// Обработчик «отправки» формы редактирования профиля, хотя пока она никуда отправляться не будет
export const formSubmitEditHandler = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // Найдём в форме кнопку отправки
  const buttonElement = evt.target.querySelector('.form-edit__button-save');
  renderLoading(buttonElement, true);
  // Отправим новые значения на сервер
  editProfileInfo(nameInput.value, jobInput.value)
    .then((result) => {
      getUserInfo()
        .then((result) => {
          // обрабатываем результат
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      setTimeout(renderLoading, 400, buttonElement, false);
      // закрываем форму
      closePopup(popupInfoElement);
    });
}

// Обработчик «отправки» формы добавления карточки, хотя пока она никуда отправляться не будет
export const formSubmitAddHandler = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // Найдём в форме кнопку отправки
  const buttonElement = evt.target.querySelector('.form-edit__button-save');
  renderLoading(buttonElement, true);
  // Отправим новые значения на сервер
  createCard(placeInput.value, linkInput.value)
    .then((result) => {
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      setTimeout(renderLoading, 400, buttonElement, false);
      // закрываем форму
      closePopup(popupAddElement);
      // очищаем форму
      evt.target.reset();
      // деактивируем кнопку сабмита
      buttonElement.disabled = true;
    });
}

let cardId;

// Обработчик «отправки» формы удаления карточки, хотя пока она никуда отправляться не будет
export const formSubmitDeleteHandler = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // Отправим запрос на удаление карточки на сервер
  const listItem = evtTarget.closest('.cards__item');
  deleteCard(cardId, listItem)
    .then((result) => {
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  // закрываем форму
  closePopup(popupDeleteCard);
}

let evtTarget;

// функция обработчика кнопки удаления карточки
export const deleteButtonHandler = (button, card) => {
  button.addEventListener('click', function (evt) {
    evtTarget = evt.target;
    openPopup(popupDeleteCard);
    cardId = card._id;
    formDeleteElement.addEventListener('submit', formSubmitDeleteHandler);
  });
}

// функция закрытия попапа кликом на кнопку "закрыть" и оверлей
export const closePopupButtonOverlay = (popup, evt) => {
  const isCloseButtonClicked = evt.target.classList.contains('popup__close-icon');
  const isOverlayClicked = evt.target.classList.contains(popup.classList[1]);
  if (isCloseButtonClicked || isOverlayClicked) {
    closePopup(popup);
  }
}





// Обработчик «отправки» формы обновления аватара, хотя пока она никуда отправляться не будет
export const formSubmitUpdateAvatarHandler = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // Вставим новые значения с помощью textContent
  // nameText.textContent = nameInput.value;
  // jobText.textContent = jobInput.value;
  // Найдём в форме кнопку отправки
  const buttonElement = evt.target.querySelector('.form-edit__button-save');
  renderLoading(buttonElement, true);
  // Отправим новые значения на сервер
  updateAvatar(avatarLinkInput.value)
    .then((result) => {
      getUserInfo()
        .then((result) => {
          // обрабатываем результат
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      setTimeout(renderLoading, 400, buttonElement, false);
      // закрываем форму
      closePopup(popupAvatarElement);
    });

    

  
}