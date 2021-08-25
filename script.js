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
  placeInput.value = '';
  linkInput.value = '';
});


// Находим форму редактирования в DOM
const formEditElement = bodyElement.querySelector('[name="edit"]');
// Находим поля формы в DOM
const nameInput = formEditElement.querySelector('[name="firstname"]');
const jobInput = formEditElement.querySelector('[name="description"]');

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitEditHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // Получите значение полей jobInput и nameInput из свойства value
  nameInput.value;//
  jobInput.value;//
  // Выберите элементы, куда должны быть вставлены значения полей
  let nameText = bodyElement.querySelector('.info__name').childNodes[0];
  let jobText = bodyElement.querySelector('.info__description');
  // Вставьте новые значения с помощью textContent
  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;
  // заменяем значения полей формы на новые значения
  nameInput.setAttribute('placeholder', `${nameText.value}`);
  jobInput.setAttribute('placeholder', `${jobText.value}`);
  // закрываем форму
  popupInfoElement.classList.remove('popup_opened');  
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener('submit', formSubmitEditHandler);


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



//функция добавления карточки
function addCard(name, link) {
  //выбираем template и сохраняем в переменную
  const cardTemplate = bodyElement.querySelector('#card-template').content;
  //клонируем содержимое шаблона
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  //добавляем элементу картинку
  cardElement.querySelector('.element__image').src = link;
  //добавляем название
  cardElement.querySelector('.element__caption-title').textContent = name;

  return cardElement;
}

//перебираем массив
initialCards.forEach((item) => {
  //вызываем функцию addCard
  const cardElement = addCard(item.name, item.link);
  
  //добавим элемент в конец контейнера со списком
  cardsContainer.append(cardElement);
});


//находим форму добавления карточек в DOM
const formAddElement = bodyElement.querySelector('[name="add"]');
// Находим поля формы в DOM
const placeInput = formAddElement.querySelector('[name="place"]');
const linkInput = formAddElement.querySelector('[name="link"]');

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitAddHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // Получаем значение полей placeInput и linkInput из свойства value
  placeInput.value;
  linkInput.value;
  // вызываем функцию addCard
  addCard(placeInput.value, linkInput.value);

  //добавим элемент в начало контейнера со списком
  cardsContainer.prepend(addCard(placeInput.value, linkInput.value));

  // закрываем форму
  popupAddElement.classList.remove('popup_opened');
  placeInput.value = '';
  linkInput.value = '';

  //находим кнопку "лайк"
  const likeButtonOne = bodyElement.querySelector('.element__icon');
  //обработчик клика на кнопку "лайк"
  likeButtonOne.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__icon_active');
  });

  //находим кнопку удаления карточки
  const deleteButtonOne = bodyElement.querySelector('.element__button-delete');
  //обработчик клика на кнопку "удалить"
  deleteButtonOne.addEventListener('click', function (evt) {
    const evtTarget = evt.target;
    //находим нужный элемент - карточку для удаления
    const listItem = evtTarget.closest('.cards__item');
    //удаляем его
    listItem.remove();
  });
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formAddElement.addEventListener('submit', formSubmitAddHandler);


  //находим кнопки "лайк"
  const likeButton = bodyElement.querySelectorAll('.element__icon');

  //перебираем массивоподобную коллекцию кнопок
  likeButton.forEach((button) => {
    //обработчик клика на каждую кнопку "лайк"
    button.addEventListener('click', function (evt) {
      const eventTarget = evt.target;
      eventTarget.classList.toggle('element__icon_active');
    });
  });


//находим кнопки удаления карточки
const deleteButton = bodyElement.querySelectorAll('.element__button-delete');

//перебираем массивоподобную коллекцию кнопок
deleteButton.forEach((button) => {
  //обработчик клика на каждую кнопку "удалить"
  button.addEventListener('click', function (evt) {
    const evtTarget = evt.target;
    //находим нужный элемент - карточку для удаления
    const listItem = evtTarget.closest('.cards__item');
    //удаляем его
    listItem.remove();
  });
});






