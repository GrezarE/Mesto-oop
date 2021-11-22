export default class Card {
  constructor(
    // Что то дофига получается, но ладно
    { data, handleCardClic, userId, apiLikeAdd, apiLikeDel, apiCardDel },
    selector
  ) {
    // Селектор для template
    this._selector = selector;
    // Раскидываем дата
    this._data = data;
    // this._link = data.link;
    // this._name = data.name;
    // this._likeLength = data.likes.length;
    // фунция открытия попапа с картинкой, делаем после класса попапа
    this._handleCardClick = handleCardClic;
    // Id
    this._userId = userId;
    // api функционал, присваиваем в index.js
    this._apiLikeAdd = apiLikeAdd;
    this._apiLikeDel = apiLikeDel;
    this._apiCardDel = apiCardDel;
  }

  // Находим в template и клонируем содержимое
  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector('.cards__item')
      .cloneNode(true);

    return cardElement;
  }

  // Функция лайкания
  _likeButtonHandler() {
    if (!eventTarget.classList.contains("element__icon_active")) {
      this._apiLikeAdd(this._data._id)
        .then((card) => {
          // Выставляем лайки
          this._element.querySelector(".element__likes").textContent =
            card.likes.length;
          // Добавляем активную иконку
          this._element
            .querySelector(".element__icon")
            .classList.add("element__icon_active");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._apiLikeDel(this._data._id)
        .then((card) => {
          // Выставляем лайки
          this._element.querySelector(".element__likes").textContent =
            card.likes.length;
          // Убираем активную иконку
          this._element
            .querySelector(".element__icon")
            .classList.remove("element__icon_active");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // Метод навешивания слушателей
  _setEventListener() {
    // Вешаем слушатель на кнопку удаления
    this._element
      .querySelector(".element__button-delete")
      .addEventListener("click", () => {});

    // Вешаем слушатель на кнопку лайка
    this._element
      .querySelector(".element__icon")
      .addEventListener("click", () => {
        this._likeButtonHandler();
      });
  }

  // Публичный метод, возвращает готовую карточку
  createCard() {
    // Создаем элемент
    this._element = this._getElement();
    // добавляем элементу картинку и к ней атрибут alt
    this._element.querySelector('.element__image').src = this._data.link;
    this._element.querySelector('.element__image').alt = this._data.name;
    // добавляем название
    this._element.querySelector('.element__caption-title').textContent = this._data.name;
    // добавляем количество лайков
    this._element.querySelector('.element__likes').textContent = this._data.likes.length;

    // добавляем кнопку "лайк"
    const arrLikes = this._data.likes;
    arrLikes.forEach((likeElement) => {
      if (likeElement._id === userId) {
        this._element
          .querySelector('.element__icon')
          .classList
          .add('element__icon_active');
      }
    });

    // добавляем кнопку удаления карточки
    this._element.querySelector('.element__button-delete');
    if (userId === this._data.owner._id) {
      this._element
        .querySelector('.element__button-delete')
        .classList
        .add('element__button-delete_active');
    }

    // Вешаем слушателей
    this._setEventListener();

    // Возвращаем элемент
    return this._element;
  }
}
