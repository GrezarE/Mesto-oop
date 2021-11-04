import { bodyElement } from './utilits.js'
// import { cardsContainer } from './utilits.js'

import { cardButtonHandler } from './modal.js';

// готовый массив с карточками
// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

// import { getInitialCards } from './api.js';

// функция обработчика кнопки "Лайк"
function likeButtonHandler(button) {
  button.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__icon_active');
  });
}

// функция обработчика кнопки удаления карточки
function deleteButtonHandler(button) {
  button.addEventListener('click', function (evt) {
    const evtTarget = evt.target;
    // находим нужный элемент - карточку для удаления
    const listItem = evtTarget.closest('.cards__item');
    // удаляем его
    listItem.remove();
  });
}

// функция добавления карточки
export function addCard(name, link) {
  // выбираем template и сохраняем в переменную
  const cardTemplate = bodyElement.querySelector('#card-template').content;
  // клонируем содержимое шаблона
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  // добавляем элементу картинку и к ней атрибут alt
  cardElement.querySelector('.element__image').src = link;
  cardElement.querySelector('.element__image').alt = name;
  // добавляем название
  cardElement.querySelector('.element__caption-title').textContent = name;
  // находим кнопку "лайк"
  const likeButton = cardElement.querySelector('.element__icon');
  // добавляем обработчик клика на кнопку "лайк"
  likeButtonHandler(likeButton);
  // находим кнопку удаления карточки
  const deleteButton = cardElement.querySelector('.element__button-delete');
  // добавим обработчик клика на кнопку "удалить"
  deleteButtonHandler(deleteButton);
  // находим кнопку, по которой открывается модальное окно карточки
  const cardButton = cardElement.querySelector('.element__button-card');
  // обработчик клика на кнопку "карточка"
  cardButtonHandler(cardButton);
  return cardElement;
}

// export const isInitialCards = () => {
//   // перебираем массив
//   initialCards.forEach((item) => {
//     // вызываем функцию addCard
//     const cardItem = addCard(item.name, item.link);
//     // добавим элемент в конец контейнера со списком
//     cardsContainer.append(cardItem);
//   });
// };