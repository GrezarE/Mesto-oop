//находим элемент body
export const bodyElement = document.querySelector('.page');
// находим модальное окно редактирования
export const popupInfoElement = bodyElement.querySelector('.popup_option_info');
// находим модальное окно добавления
export const popupAddElement = bodyElement.querySelector('.popup_option_add');
// находим модальное окно карточки
export const popupCardElement = bodyElement.querySelector('.popup_option_card');
// находим список с карточками
export const cardsContainer = bodyElement.querySelector('.cards');
// находим форму добавления карточек в DOM
export const formAddElement = bodyElement.querySelector('[name="add"]');
// Находим поля формы в DOM
export const placeInput = formAddElement.querySelector('[name="place"]');
export const linkInput = formAddElement.querySelector('[name="link"]');
// Выберем элементы, куда должны быть вставлены значения полей
export const nameText = bodyElement.querySelector('.info__name');
export const jobText = bodyElement.querySelector('.info__description');
// Находим форму редактирования в DOM
export const formEditElement = bodyElement.querySelector('[name="edit"]');
// Находим поля формы в DOM
export const nameInput = formEditElement.querySelector('[name="firstname"]');
export const jobInput = formEditElement.querySelector('[name="description"]');
//находим кнопку, по которой открывается модальное окно редактирования
export const infoButton = bodyElement.querySelector('.info__button');
// находим кнопку, по которой открывается модальное окно добавления
export const addButton = bodyElement.querySelector('.profile__button-add');
// находим модальное окно удаления карточки
export const popupDeleteCard = bodyElement.querySelector('.popup_option_delete-card');
// находим модальное окно обновления аватара
export const popupAvatarElement = bodyElement.querySelector('.popup_option_avatar');
// находим форму удаления карточек
export const formDeleteElement = bodyElement.querySelector('[name="delete"]');
// находим форму обновления аватара
export const formAvatarElement = bodyElement.querySelector('[name="avatar"]');
// находим кнопку, по которой открывается модальное окно обновления аватара
export const avatarButton = bodyElement.querySelector('.profile__button-avatar');
// Находим поле формы в DOM
export const avatarLinkInput = formAvatarElement.querySelector('[name="link-avatar"]');
// Выберем сам элемент
export const avatarLinkText = bodyElement.querySelector('.profile__avatar');
// Выберем все попапы
export const popups = document.querySelectorAll('.popup');


// функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  // добавили обработчик
  document.removeEventListener('keydown', closeByEscape);
}

// функция-обработчик нажатия на клавишу "Escape"
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    // нашли открытый попап
    const openedPopup = document.querySelector('.popup_opened');
    // закрыли попап
    closePopup(openedPopup);
  }
}

// функция открытия попапа
export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  // удалили обработчик
  document.addEventListener('keydown', closeByEscape);
}

// функция изменения текста кнопки
export const renderLoading = (button, isLoading, text='Сохранить') => {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = text;
  }
}