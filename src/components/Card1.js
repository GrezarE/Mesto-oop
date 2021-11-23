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
      .content.querySelector(".cards__item")
      .cloneNode(true);

    return cardElement;
  }

  // Метод лайкания
  _likeButtonHandler() {
    if (!this._likeButton.classList.contains("element__icon_active")) {
      console.log(this._data._id);
      this._apiLikeAdd(this._data._id)
        .then((card) => {
          // Выставляем лайки
          this._element.querySelector(".element__likes").textContent =
            card.likes.length;
          // Добавляем активную иконку
          this._likeButton.classList.add("element__icon_active");
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
          this._likeButton.classList.remove("element__icon_active");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // Метод удаления карточки
  _deleteButtonHandler() {
    // Открыли попап
    // Вешаем слушатель на отправку формы
  }

  // Метод просмотра карточки в попапе

  // Метод навешивания слушателей
  _setEventListener() {
    // Вешаем слушатель на кнопку удаления
    this._deleteButton.addEventListener("click", () => {});

    // Вешаем слушатель на кнопку лайка
    this._likeButton.addEventListener("click", () => {
      this._likeButtonHandler();
    });
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
    // Вешаем слушатель на клик самой карточки
  }

  // Публичный метод, возвращает готовую карточку
  createCard() {
    // Создаем элемент
    this._element = this._getElement();

    // Находим кнопку лайка
    this._likeButton = this._element.querySelector(".element__icon");
    // Находим кнопку удаления карточки
    this._deleteButton = this._element.querySelector(".element__button-delete");

    // добавляем элементу картинку и к ней атрибут alt
    this._element.querySelector(".element__image").src = this._data.link;
    this._element.querySelector(".element__image").alt = this._data.name;
    // добавляем название
    this._element.querySelector(".element__caption-title").textContent =
      this._data.name;
    // добавляем количество лайков
    this._element.querySelector(".element__likes").textContent =
      this._data.likes.length;

    // добавляем кнопку "лайк"
    this._data.likes.forEach((likeElement) => {
      if (likeElement._id === this.userId) {
        this._likeButton.classList.add("element__icon_active");
      }
    });

    // добавляем кнопку удаления карточки
    if (this.userId === this._data.owner._id) {
      this._deleteButton.classList.add("element__button-delete_active");
    }

    // Вешаем слушателей
    this._setEventListener();

    // Возвращаем элемент
    return this._element;
  }
}
