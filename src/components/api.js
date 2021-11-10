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
import { avatarLinkText } from './utilits.js'
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

export let userId;

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
      userId = data._id;
      // console.log(userId);
      nameText.textContent = data.name;
      jobText.textContent = data.about;
      avatarLinkText.src = data.avatar;
      console.log(avatarLinkText.src);
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
        // console.log(card.likes.length);

        // добавляем карточку на страницу
        // вызываем функцию addCard
        const cardItem = addCard(card);
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
      cardsContainer.prepend(addCard(card));
    });
}

// отправить запрос на удаление карточки
export const deleteCard = (cardId, cardElement) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((card) => {
      cardElement.remove();
    });
}

// отправить запрос на постановку лайка
export const addLike = (cardId, counter) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
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
      // console.log(card.likes.length);

      counter.textContent = card.likes.length;
      // console.log(counter.textContent);

    });
}

// отправить запрос на удаление лайка
export const deleteLike = (cardId, counter) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((card) => {
      counter.textContent = card.likes.length;
      // console.log(counter.textContent);
    });
}

// отправить измененные данные о пользователе на сервер
// export const editAvatar = (avatar) => {
//   return fetch(`${config.baseUrl}/users/me/avatar`, {
//     method: 'PATCH',
//     headers: config.headers,
//     body: JSON.stringify({
//       avatar: avatar
//     })
//   })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }

//       // если ошибка, отклоняем промис
//       return Promise.reject(`Ошибка: ${res.status}`);
//     })
//     .then((data) => {
//       // console.log(data);
//     });
// }

// отправить измененные данные об аватаре на сервер
export const updateAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
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
      console.log(data);
      // console.log(data.name);
      // console.log(data.about);

      
    });
}
