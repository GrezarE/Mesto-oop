// Токен: a26fb37f-3598-49d5-8eb1-77505c512d04
// Идентификатор группы: plus-cohort-3
// Адрес сервера проекта Mesto: https://mesto.nomoreparties.co

// return fetch('https://nomoreparties.co/v1/plus-cohort-3/cards', {
//   headers: {
//     authorization: 'a26fb37f-3598-49d5-8eb1-77505c512d04'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });



// fetch('https://nomoreparties.co/v1/plus-cohort-3/cards', {
//   headers: {
//     authorization: 'a26fb37f-3598-49d5-8eb1-77505c512d04'
//   }
// })
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

import { placeInput } from './utilits.js'
import { linkInput } from './utilits.js'
import { nameText } from './utilits.js';
import { jobText } from './utilits.js';
import { cardsContainer } from './utilits.js'
import { addCard } from './card.js'


const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-3',
  headers: {
    authorization: 'a26fb37f-3598-49d5-8eb1-77505c512d04',
    'Content-Type': 'application/json'
  }
}

// получить информацию о пользователе с сервера
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      // console.log(data);
      // console.log(data.name);
      // console.log(data.about);

      nameText.textContent = data.name;
      jobText.textContent = data.about;
    });
}

// загрузка карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((cards) => {
      console.log(cards);
      cards.forEach((card) => {
        // console.log(card.name);
        // console.log(card.link);
        console.log(card.likes.length);

        // добавляем карточку на страницу
        // вызываем функцию addCard
        const cardItem = addCard(card.name, card.link, card.likes.length);
        // добавим элемент в конец контейнера со списком
        cardsContainer.append(cardItem);
      });
    });
}

// отправить измененные данные о пользователе на сервер
export const editProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      // console.log(data);
      // console.log(data.name);
      // console.log(data.about);

      
    });
}

// отправить данные для создания новой карточки
export const createCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((card) => {
      // console.log(card);
      cardsContainer.prepend(addCard(card.name, card.link,  card.likes.length));
    });
}
