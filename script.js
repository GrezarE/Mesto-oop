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



// Находим форму в DOM
const formElement = bodyElement.querySelector('[name="edit"]');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('[name="firstname"]');
const jobInput = formElement.querySelector('[name="description"]');



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







// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  // Получите значение полей jobInput и nameInput из свойства value
  nameInput.value;
  jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  let nameText = nameInput.value;
  let jobText = jobInput.value;
  // Вставьте новые значения с помощью textContent
  nameInput.textContent = nameText.value;
  jobInput.textContent = jobText.value;
  
  
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


