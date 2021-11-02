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


import { cardsContainer } from './utilits.js'
import { addCard } from './card.js'


const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-3',
  headers: {
    authorization: 'a26fb37f-3598-49d5-8eb1-77505c512d04',
    'Content-Type': 'application/json'
  }
}

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
        console.log(card.name);
        console.log(card.link);

        // добавляем карточку на страницу
        // вызываем функцию addCard
        const cardItem = addCard(card.name, card.link);
        // добавим элемент в конец контейнера со списком
        cardsContainer.append(cardItem);
      });
    });
}
