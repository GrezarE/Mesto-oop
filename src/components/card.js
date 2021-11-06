import { bodyElement } from './utilits.js'
// import { cardsContainer } from './utilits.js'

import { cardButtonHandler } from './modal.js';
import { deleteButtonHandler } from './modal.js';

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

import { addLike, deleteLike, userId } from './api.js';

// функция обработчика кнопки "Лайк"
function likeButtonHandler(button, card) {
  button.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    // console.log(eventTarget);
    const cardElement = eventTarget.closest('.cards__item');
    const likesCounter = cardElement.querySelector('.element__likes');
    const cardId = card._id;
    if (!eventTarget.classList.contains('element__icon_active')) {
      addLike(cardId, likesCounter)
        .then((result) => {
          // console.log(card.likes);
          // добавляем количество лайков
          eventTarget.classList.add('element__icon_active');
          // cardElement.querySelector('.element__likes').textContent = card.likes.length;
          // console.log(cardElement.querySelector('.element__likes').textContent);
        })
        .catch((err) => {
          console.log(err);
        });
      
    } else {
      deleteLike(cardId, likesCounter)
        .then((result) => {
          eventTarget.classList.remove('element__icon_active');
        })
        .catch((err) => {
          console.log(err);
        });
      
    }
  });
}

// // функция обработчика кнопки удаления карточки
// function deleteButtonHandler(button) {
//   button.addEventListener('click', function (evt) {

//     const evtTarget = evt.target;
//     // находим нужный элемент - карточку для удаления
//     const listItem = evtTarget.closest('.cards__item');
//     // удаляем его
//     listItem.remove();
//   });
// }




// функция добавления карточки
export function addCard(card) {
  // выбираем template и сохраняем в переменную
  const cardTemplate = bodyElement.querySelector('#card-template').content;
  // клонируем содержимое шаблона
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  // добавляем элементу картинку и к ней атрибут alt
  cardElement.querySelector('.element__image').src = card.link;
  cardElement.querySelector('.element__image').alt = card.name;
  // добавляем название
  cardElement.querySelector('.element__caption-title').textContent = card.name;
  // добавляем количество лайков
  cardElement.querySelector('.element__likes').textContent = card.likes.length;
  
    // находим кнопку "лайк"
  const likeButton = cardElement.querySelector('.element__icon');

  const arrLikes = card.likes;
  // console.log(arrLikes);
  arrLikes.forEach((likeElement) => {
    if (likeElement._id === userId) {
      likeButton.classList.add('element__icon_active');
    }
  });
  // if (arrLikes.some((likeElement) => {
  //   return (likeElement._id === userId)
  // }) {
  //   likeButton.classList.add('element__icon_active');
  // };

  // добавляем обработчик клика на кнопку "лайк"
  likeButtonHandler(likeButton, card);

  // console.log(card.likes);
  // console.log(userId);
  // console.log(card._id);
  
  // находим кнопку удаления карточки
  const deleteButton = cardElement.querySelector('.element__button-delete');
  if (userId === card.owner._id) {
    deleteButton.classList.add('element__button-delete_active');
    // console.log(card);
    // добавим обработчик клика на кнопку "удалить"
    deleteButtonHandler(deleteButton, card);
  }
  
  
  // deleteButtonHandler(deleteButton, card._id);
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