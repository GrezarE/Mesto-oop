import { bodyElement } from './utilits.js'
import { cardButtonHandler, deleteButtonHandler } from './modal.js';
import { addLike, deleteLike } from './api.js';
import { userId } from '../pages/index.js';

// функция обработчика кнопки "Лайк"
function likeButtonHandler(button, card) {
  button.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    const cardElement = eventTarget.closest('.cards__item');
    const likesCounter = cardElement.querySelector('.element__likes');
    const cardId = card._id;
    if (!eventTarget.classList.contains('element__icon_active')) {
      addLike(cardId)
        .then((card) => {
          likesCounter.textContent = card.likes.length;
          // добавляем количество лайков
          eventTarget.classList.add('element__icon_active');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      deleteLike(cardId)
        .then((card) => {
          likesCounter.textContent = card.likes.length;
          eventTarget.classList.remove('element__icon_active');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}

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
  arrLikes.forEach((likeElement) => {
    if (likeElement._id === userId) {
      likeButton.classList.add('element__icon_active');
    }
  });
  // добавляем обработчик клика на кнопку "лайк"
  likeButtonHandler(likeButton, card);

  // находим кнопку удаления карточки
  const deleteButton = cardElement.querySelector('.element__button-delete');
  if (userId === card.owner._id) {
    deleteButton.classList.add('element__button-delete_active');
    // добавим обработчик клика на кнопку "удалить"
    deleteButtonHandler(deleteButton, card);
  }

  // находим кнопку, по которой открывается модальное окно карточки
  const cardButton = cardElement.querySelector('.element__button-card');
  // обработчик клика на кнопку "карточка"
  cardButtonHandler(cardButton);
  return cardElement;
}