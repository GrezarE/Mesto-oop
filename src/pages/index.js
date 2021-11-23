import "./index.css"; // добавьте импорт главного файла стилей

import { popupInfoElement } from "../components/utilits.js";
import { popupAddElement } from "../components/utilits.js";
import { popups } from "../components/utilits.js";
import { popupAvatarElement } from "../components/utilits.js";
import { formAddElement } from "../components/utilits.js";
import { nameText, jobText, avatarLinkText } from "../components/utilits.js";
import { formEditElement } from "../components/utilits.js";
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





import {
  configValid,
  formList,
  configApi
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import Card1 from "../components/Card1.js";
import Section from "../components/Section.js";


// добавляем обработчик клика по кнопке "редактировать"
infoButton.addEventListener("click", () => {
  openPopup(popupInfoElement);
  // вставим начальные данные из профиля в поля формы
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
});

// добавляем обработчик клика по кнопке "добавить"
addButton.addEventListener("click", () => {
  openPopup(popupAddElement);
});

// добавляем обработчик клика по кнопке "аватар"
avatarButton.addEventListener("click", () => {
  openPopup(popupAvatarElement);
});

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    closePopupButtonOverlay(popup, evt);
  });
});

// Прикрепляем обработчик к форме редактирования: он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener("submit", formSubmitEditHandler);

// Прикрепляем обработчик к форме добавления карточек: он будет следить за событием “submit” - «отправка»
formAddElement.addEventListener("submit", formSubmitAddHandler);

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
  const validation = new FormValidator({data: configValid}, form);
  validation.enableValidation();
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




    const cardList = new Section({
      items: cards, // пока так
      renderer: (cardItem) => {
        // функция, отвечает за создание и отрисовку элементов
        const card = new Card1({ data:cardItem }, '.card-template');
        console.log(card);
        const cardElement = card.createCard();
        cardList.addItem(cardElement);

      }
    }, '.cards');
    console.log(cardList);
    console.log(cardList._items);
    console.log(cardList._container);




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





// const cardList = new Section({
//   items: items, // пока так
//   renderer: (cardItem) => {
//     // функция, отвечает за создание и отрисовку элементов
//     const card = new Card1(cardItem, '.card-template');
//     const cardElement = card.createCard();
//     cardList.addItem(cardElement);

//   },
//   cardsContainer
// });
