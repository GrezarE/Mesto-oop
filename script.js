//находим элемент body
const bodyElement = document.querySelector('.page');
//находим кнопку, по которой открывается модальное окно редактирования
const infoButton = bodyElement.querySelector('.info__button');
//находим модальное окно редактирования
const popupInfoElement = bodyElement.querySelector('.popup_option_info');
//находим кнопку, по которой модальное окно закрывается
const closeButtonInfo = bodyElement.querySelector('section.popup_option_info .popup__close-icon');

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
});


//добавляем обработчик клика по кнопке "добавить"
addButton.addEventListener('click', () => {
  popupAddElement.classList.add('popup_opened');
});

//добавляем обработчик клика по кнопке "закрыть"
closeButtonAdd.addEventListener('click', () => {
  popupAddElement.classList.remove('popup_opened');
});


