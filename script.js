//находим элемент body
const bodyElement = document.querySelector('.page');
//находим кнопку, по которой открывается модальное окно редактирования
const infoButton = bodyElement.querySelector('.info__button');
//находим модальное окно редактирования
const popupInfoElement = bodyElement.querySelector('.popup_option_info');
//находим кнопку, по которой модальное окно закрывается
const closeButton = bodyElement.querySelector('.popup__close-icon');

//находим кнопку, по которой открывается модальное окно добавления
const addButton = bodyElement.querySelector('.profile__button-add');
//находим модальное окно добавления
const popupAddElement = bodyElement.querySelector('.popup_option_add');


//добавляем обработчик клика по кнопке "редактировать"
infoButton.addEventListener('click', () => {
  popupInfoElement.classList.add('popup_opened');
});

//добавляем обработчик клика по кнопке "закрыть"
popupInfoElement.addEventListener('click', () => {
  popupInfoElement.classList.remove('popup_opened');
});


//добавляем обработчик клика по кнопке "добавить"
addButton.addEventListener('click', () => {
  popupAddElement.classList.add('popup_opened');
});

//добавляем обработчик клика по кнопке "закрыть"
popupAddElement.addEventListener('click', () => {
  popupAddElement.classList.remove('popup_opened');
});