//находим элемент body
const bodyElement = document.querySelector('.page');
//находим кнопку, по которой открывается модальное окно редактирования
const infoButton = bodyElement.querySelector('.info__button');
//находим модальное окно редактирования
const popupInfoElement = bodyElement.querySelector('.popup_option_info');
//находим кнопку, по которой модальное окно закрывается
const closeButtonInfo = bodyElement.querySelector('section.popup_option_info .popup__close-icon');
//находим кнопку "Сохранить" окна редактирования
const ButtonSave = bodyElement.querySelector('section.popup_option_info .form-edit__button-save');
//находим кнопку, по которой открывается модальное окно добавления
const addButton = bodyElement.querySelector('.profile__button-add');
//находим модальное окно добавления
const popupAddElement = bodyElement.querySelector('.popup_option_add');
//находим кнопку, по которой модальное окно закрывается
const closeButtonAdd = bodyElement.querySelector('section.popup_option_add .popup__close-icon');

//добавляем обработчик клика по кнопке "редактировать"
infoButton.addEventListener('click', () => {
  popupInfoElement.classList.add('popup_opened');
});

//добавляем обработчик клика по кнопке "закрыть"
closeButtonInfo.addEventListener('click', () => {
  popupInfoElement.classList.remove('popup_opened');
  nameInput.value = '';
  jobInput.value = '';
});

//добавляем обработчик клика по кнопке "добавить"
addButton.addEventListener('click', () => {
  popupAddElement.classList.add('popup_opened');
});

//добавляем обработчик клика по кнопке "закрыть"
closeButtonAdd.addEventListener('click', () => {
  popupAddElement.classList.remove('popup_opened');
});


// Находим форму редактирования в DOM
const formEditElement = bodyElement.querySelector('[name="edit"]');
// Находим поля формы в DOM
const nameInput = formEditElement.querySelector('[name="firstname"]');
const jobInput = formEditElement.querySelector('[name="description"]');

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // Получите значение полей jobInput и nameInput из свойства value
  nameInput.value;//?
  jobInput.value;//?
  // Выберите элементы, куда должны быть вставлены значения полей
  let nameText = nameInput.value;
  let jobText = jobInput.value;
  // Вставьте новые значения с помощью textContent
  nameInput.textContent = nameText.value;
  jobInput.textContent = jobText.value;
  nameInput.setAttribute('placeholder', `$(nameText.value)`);
  jobInput.setAttribute('placeholder', `$(jobText.value)`);
  popupInfoElement.classList.add('popup_opened');
  
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener('submit', formSubmitHandler);


//готовый массив с карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//находим список с карточками
const cardsContainer = bodyElement.querySelector('.cards');

//перебираем массив
initialCards.forEach((item) => {
   //выбираем template и сохраняем в переменную
  const cardTemplate = bodyElement.querySelector('#card-template').content;
  //клонируем содержимое шаблона
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  //добавляем элементу картинку
  cardElement.querySelector('.element__image').src = item.link;
  //добавляем название
  cardElement.querySelector('.element__caption-title').textContent = item.name;

  //добавим элемент в начало контейнера со списком
  cardsContainer.prepend(cardElement);
});
  
  
  



//функция добавления карточки
function addCard(imgValue, captionValue) {
  //выбираем template и сохраняем в переменную
  const cardTemplate = bodyElement.querySelector('#card-template').content;
  //клонируем содержимое шаблона
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  //добавляем элементу картинку
  cardElement.querySelector('.element__image').src = imgValue;
  //добавляем название
  cardElement.querySelector('.element__caption-title').textContent = captionValue;

  //добавим элемент в начало контейнера со списком
  cardsContainer.prepend(cardElement);

}






//находим форму добавления карточек в DOM
const formAddElement = bodyElement.querySelector('[name="add"]');
// Находим поля формы в DOM
const placeInput = formAddElement.querySelector('[name="place"]');
const linkInput = formAddElement.querySelector('[name="link"]');

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // Получите значение полей jobInput и nameInput из свойства value
  placeInput.value;
  linkInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  let placeText = placeInput.value;
  let linkText = linkInput.value;
  // Вставьте новые значения с помощью textContent
  placeInput.textContent = placeText.value;
  linkInput.textContent = linkText.value;
  popupAddElement.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formAddElement.addEventListener('submit', formSubmitHandler);


//находим кнопку "лайк"
const likeButton = bodyElement.querySelector('.element__icon');
//обработчик клика на кнопку "лайк"
likeButton.addEventListener('click', function (evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('element__icon_active');
});

