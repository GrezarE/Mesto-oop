const config = {
  formSelector: '.form-edit',
  inputSelector: '.form-edit__item',
  buttonSelector: '.form-edit__button-save',
  inputErrorClass: 'form-edit__item_error',
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  // находим нужный span по ID
  console.log(formElement);
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  console.log(errorElement);
  // вставляем текст ошибки
  errorElement.textContent = errorMessage;
  // добавляем класс с ошибкой
  inputElement.classList.add(config.inputErrorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  // находим нужный span по ID
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  // убираем текст с ошибкой
  errorElement.textContent = '';
  // удаляем класс с ошибкой
  inputElement.classList.remove(config.inputErrorClass);
};

const isValid = (formElement, inputElement) => {
  // if valid, hide error else show error
  if (inputElement.validity.valid) {
    // hide error
    hideInputError(formElement, inputElement);
  } else {
    // show error
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
};






// Функция, которая проверяет валидность поля
const isFormValid = (inputList) => {
  return inputList.every((inputElement) => {
    inputElement.validity.valid;
  });
};




const toggleButtonState = (buttonElement, inputList) => {
  // if form valid enable button else disable
  if (isFormValid(inputList)) {
    // enable button
    buttonElement.disabled = false;
  } else {
    // disable button
    buttonElement.disabled = true;
  }
};













const setEventListeners = (formElement) => {
  formElement.addEventListener('submit', (evt) => {
    // У каждой формы отменим стандартное поведение
    evt.preventDefault();
  });
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(document.querySelectorAll(config.inputSelector));


  // find submit button
  /*const submitButton = document.querySelector(config.buttonSelector);*/


  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);

      // toggle button state
      /*toggleButtonState(submitButton, inputList);*/
    });
  });
  // set initial button state
  /*toggleButtonState(submitButton, inputList);*/
};




/*export*/ const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();