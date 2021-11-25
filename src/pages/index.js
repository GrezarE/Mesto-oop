import "./index.css"; // добавьте импорт главного файла стилей

import {
  configValid,
  formList,
  configApi,
  popupInfoElement,
  popupAddElement,
  popupAvatarElement,
  popupCardElement,
  popupDeleteCard,
  infoButton,
  addButton,
  avatarButton,
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

let userId;

// Создаем экземпляр класса Api
const api = new Api(configApi);

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
    // const inputObj = submitCardPopup._getInputValues();
    const inputObj = submitCardPopup.getInputValues();
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

// Экземпляр класса UserInfo
const userInfo = new UserInfo({
  nameElement: ".info__name",
  jobElement: ".info__description",
  avatarElement: ".profile__avatar",
  nameSelector: '[name="firstname"]',
  aboutSelector: '[name="description"]',
  getApi: () => {
    return api.getUserInfo();
  },
  setProfileApi: (inputObj) => {
    return api.editProfileInfo({
      name: inputObj.firstname,
      about: inputObj.description,
    });
  },
  setAvatarApi: (obj) => {
    return api.updateAvatar(obj.avatars);
  },
});

// Экземпляр класса для редактирования профиля
const submitEditPopup = new PopupWithForm({
  popup: popupInfoElement,
  renderer: () => {
    // Меняем кнопку на сохранение
    submitEditPopup.renderLoading(true);
    // Собираем данные с инпутов
    const inputObj = submitEditPopup._getInputValues();
    userInfo
      .setUserInfo(inputObj)
      .then(() => {
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
  userInfo.getUserInfo();
});

// Экземпляр класса для редактирования аватара
const submitAvatarPopup = new PopupWithForm({
  popup: popupAvatarElement,
  // Метод сабмита
  renderer: () => {
    // Собираем данные с инпутов
    const inputObj = submitAvatarPopup._getInputValues();
    // Меняем кнопку на сохранение
    submitAvatarPopup.renderLoading(true);
    // Запускаем отправку запроса на сервер
    userInfo
      .setUserAvatar(inputObj)
      .then(() => {
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((result) => {
    const data = result[0];
    const cards = result[1];
    // обрабатываем данные пользователя
    userId = data._id;
    userInfo.getUserInfo();

    const cardList = new Section(
      {
        items: cards, // пока так
        renderer: (cardItem) => {
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

          return cardElement;
        },
      },
      ".cards"
    );

    // Отрисовываем элементы
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
