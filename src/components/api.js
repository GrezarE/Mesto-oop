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
      // console.log(cards);
      cards.forEach((card) => {
        // console.log(card.name);
        // console.log(card.link);

        // добавляем карточку на страницу
        // вызываем функцию addCard
        const cardItem = addCard(card.name, card.link);
        // добавим элемент в конец контейнера со списком
        cardsContainer.append(cardItem);
      });
    });
}

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
      console.log(data);
      console.log(data.name);
      console.log(data.about);

      
    });
}




// function createPost(newPost) {
//   fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: JSON.stringify({
//       title: newPost.title,
//       body: newPost.body
//     }),
//     headers: {
//       'Content-Type': 'application/json; charset=UTF-8'
//     }
//   })
//   .then(response => response.json())
//   .then((post) => {
//     addPostToDOM(
//         document.querySelector('.container'),
//         createPostMarkup(post)
//       );
//   });
// }

// // обработчик сабмита формы
// document.forms.post.addEventListener('submit', function (event) {
//   event.preventDefault();

//   const { title, text } = event.currentTarget.elements;

//   createPost({
//     title: title.value,
//     body: text.value
//   });
// });
