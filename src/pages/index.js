import "./index.css"; // добавьте импорт главного файла стилей

import { popupInfoElement } from "../components/utilits.js";
import { popupAddElement } from "../components/utilits.js";
import { popups } from "../components/utilits.js";
import { popupAvatarElement } from "../components/utilits.js";
import { formAddElement } from "../components/utilits.js";
import { nameText, jobText, avatarLinkText } from "../components/utilits.js";
import {
  formEditElement,
  popupCardElement,
  popupDeleteCard,
} from "../components/utilits.js";
import { nameInput, jobInput } from "../components/utilits.js";
import { infoButton } from "../components/utilits.js";
import { addButton } from "../components/utilits.js";
import { formAvatarElement } from "../components/utilits.js";
import { avatarButton } from "../components/utilits.js";
import { openPopup } from "../components/utilits.js";
import { cardsContainer } from "../components/utilits.js";
import { closePopupButtonOverlay } from "../components/modal.js";
import { formSubmitEditHandler } from "../components/modal.js";
import { formSubmitAddHandler } from "../components/modal.js";
import { formSubmitUpdateAvatarHandler } from "../components/modal.js";
// import { enableValidation } from "../components/validate.js";
import { addCard } from "../components/card.js";

import { configValid, formList, configApi } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import Card from "../components/Card1.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Popup from "../components/Popup";
import PopupWithForm from "../components/PopupWithForm";

// добавляем обработчик клика по кнопке "редактировать"
// infoButton.addEventListener("click", () => {
//   openPopup(popupInfoElement);
//   // вставим начальные данные из профиля в поля формы
//   nameInput.value = nameText.textContent;
//   jobInput.value = jobText.textContent;
// });

// добавляем обработчик клика по кнопке "добавить"
// addButton.addEventListener("click", () => {
//   openPopup(popupAddElement);
// });

// добавляем обработчик клика по кнопке "аватар"
// avatarButton.addEventListener("click", () => {
//   openPopup(popupAvatarElement);
// });

// popups.forEach((popup) => {
//   popup.addEventListener("click", (evt) => {
//     closePopupButtonOverlay(popup, evt);
//   });
// });

// Прикрепляем обработчик к форме редактирования: он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener("submit", formSubmitEditHandler);

// Прикрепляем обработчик к форме добавления карточек: он будет следить за событием “submit” - «отправка»
// formAddElement.addEventListener("submit", formSubmitAddHandler);

// Прикрепляем обработчик к форме обновления аватара: он будет следить за событием “submit” - «отправка»
formAvatarElement.addEventListener("submit", formSubmitUpdateAvatarHandler);

// enableValidation({
//   formSelector: ".form-edit",
//   inputSelector: ".form-edit__item",
//   submitButtonSelector: ".form-edit__button-save",
//   inputErrorClass: "form-edit__item_error",
// });

// Для каждой формы создаем экземпляр класса FormValidator
formList.forEach((form) => {
  const validation = new FormValidator({ data: configValid }, form);
  validation.enableValidation();
});

// Экземпляр класса для открытия картинок
const imageOpenPopup = new PopupWithImage({ popup: popupCardElement });

// Экземпляр класса для создания карточки
const submitCardPopup = new PopupWithForm({
  popup: popupAddElement,
  // Метод сабмита
  renderer: () => {
    // Собираем данные с инпутов
    const inputObj = submitCardPopup._getInputValues();
    // Меняем кнопку на сохранение
    submitCardPopup.renderLoading(true);
    // Запускаем отправку запроса на сервер
    api
      .createCard({ name: inputObj.place, link: inputObj.link })
      .then((card) => {
        // Создаём экземпляр класса карточки, функционал схож с загрузкой на страницу... опять дохрена строчек
        const createCard = new Card(
          {
            data: card,
            userId: userId,
            handleCardClic: (item) => {
              imageOpenPopup.open(item);
            },
            apiLikeAdd: (cardId) => {
              return api.addLike(cardId);
            },
            apiLikeDel: (cardId) => {
              return api.deleteLike(cardId);
            },
            // открытие попапа и удаление карточки
            handleDeleteClic: (cardId) => {
              const deleteCardPopup = new PopupWithForm({
                // Определяем попап
                popup: popupDeleteCard,
                // метод удаления карточки
                renderer: (evt) => {
                  evt.preventDefault();
                  api
                    .deleteCard(cardId)
                    .then(() => {
                      readyCard.remove();
                      // закрываем форму
                      deleteCardPopup.close();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                },
              });
              // открываем попап удаления
              deleteCardPopup.open();
            },
          },
          "#card-template"
        );
        // Создаём карточку
        const readyCard = createCard.createCard();
        // Экземпляр класса Section
        const sectionAdd = new Section({}, ".cards");
        // Используем метод класса Section
        sectionAdd.addItem(readyCard);
        // Закрываем попап
        submitCardPopup.close();
        // деактивируем кнопку сабмита
        // submitCardPopup._popup.querySelector('.form-edit__button-save').disabled = true;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(
          submitCardPopup.renderLoading.bind(submitCardPopup),
          400,
          false,
          "Создать"
        );
      });
  },
});

// добавляем обработчик клика по кнопке "добавить"
addButton.addEventListener("click", () => {
  submitCardPopup.open();
  submitCardPopup._popup.querySelector(
    ".form-edit__button-save"
  ).disabled = true;
});

// Экземпляр класса для редактирования профиля
const submitEditPopup = new PopupWithForm({
  popup: popupInfoElement,
  // Метод сабмита
  renderer: () => {
    // Собираем данные с инпутов
    const inputObj = submitEditPopup._getInputValues();

    console.log(inputObj);

    // Меняем кнопку на сохранение
    submitEditPopup.renderLoading(true);
    // Запускаем отправку запроса на сервер
    api
      .editProfileInfo({ name: inputObj.firstname, about: inputObj.description })
      .then((data) => {
        // Закрываем попап
        submitEditPopup.close();
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      })
      .finally(() => {
        setTimeout(
          submitEditPopup.renderLoading.bind(submitEditPopup),
          400,
          false
        );
      });
  },
});

// добавляем обработчик клика по кнопке "редактировать"
infoButton.addEventListener("click", () => {
  submitEditPopup.open();
  // вставим начальные данные из профиля в поля формы
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
});

// Экземпляр класса для редактирования аватара
const submitAvatarPopup = new PopupWithForm({
  popup: popupAvatarElement,
  // Метод сабмита
  renderer: () => {
    // Собираем данные с инпутов
    const inputObj = submitAvatarPopup._getInputValues();

    console.log(inputObj);

    // Меняем кнопку на сохранение
    submitAvatarPopup.renderLoading(true);
    // Запускаем отправку запроса на сервер
    api
      .updateAvatar(inputObj.avatars)
      .then((data) => {
        // Закрываем попап
        submitAvatarPopup.close();
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      })
      .finally(() => {
        setTimeout(
          submitAvatarPopup.renderLoading.bind(submitAvatarPopup),
          400,
          false
        );
      });
  },
});

// добавляем обработчик клика по кнопке "аватар"
avatarButton.addEventListener("click", () => {
  submitAvatarPopup.open();
});

// Создаем экземпляр класса Api
export const api = new Api(configApi);

export let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((result) => {
    const data = result[0];
    const cards = result[1];
    // обрабатываем данные пользователя
    userId = data._id;
    nameText.textContent = data.name;
    jobText.textContent = data.about;
    avatarLinkText.src = data.avatar;

    const cardList = new Section(
      {
        items: cards, // пока так
        renderer: (cardItem) => {
          // console.log(cardItem);
          // функция, отвечает за создание и отрисовку элементов
          const card = new Card(
            {
              data: cardItem,
              userId: userId,
              handleCardClic: (item) => {
                imageOpenPopup.open(item);
              },
              apiLikeAdd: (cardId) => {
                return api.addLike(cardId);
              },
              apiLikeDel: (cardId) => {
                return api.deleteLike(cardId);
              },
              // apiCardDel: (cardId) => {
              //   return api.deleteCard(cardId);
              // },
              // открытие попапа и удаление карточки
              handleDeleteClic: (cardId) => {
                const deleteCardPopup = new PopupWithForm({
                  // Определяем попап
                  popup: popupDeleteCard,
                  // метод удаления карточки
                  renderer: (evt) => {
                    evt.preventDefault();
                    api
                      .deleteCard(cardId)
                      .then(() => {
                        cardElement.remove();
                        // закрываем форму
                        deleteCardPopup.close();
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  },
                });
                // открываем попап удаления
                deleteCardPopup.open();
              },
            },
            "#card-template"
          );

          const cardElement = card.createCard();

          console.log(cardElement);
          return cardElement;
        },
      },
      ".cards"
    );

    // Отрисовываем элементы
    cardList.renderItems();

    // // обрабатываем данные карточек
    // cards.forEach((card) => {
    //   // добавляем карточку на страницу
    //   // вызываем функцию addCard
    //   const cardItem = addCard(card);
    //   // добавим элемент в конец контейнера со списком
    //   cardsContainer.append(cardItem);
    // });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

// import { getUserInfo } from "../components/api.js";
// import { getInitialCards } from "../components/api.js";

// Promise.all([getUserInfo(), getInitialCards()])
//   .then((result) => {
//     const data = result[0];
//     const cards = result[1];
//     // обрабатываем данные пользователя
//     userId = data._id;
//     nameText.textContent = data.name;
//     jobText.textContent = data.about;
//     avatarLinkText.src = data.avatar;
//     // обрабатываем данные карточек
//     cards.forEach((card) => {
//       // добавляем карточку на страницу
//       // вызываем функцию addCard
//       const cardItem = addCard(card);
//       // добавим элемент в конец контейнера со списком
//       cardsContainer.append(cardItem);
//     });
//   })
//   .catch((err) => {
//     console.log(err); // выводим ошибку в консоль
//   });
