export default class UserInfo {
  constructor({
    nameElement,
    jobElement,
    avatarElement,
    nameSelector,
    aboutSelector,
    getApi,
    setProfileApi,
    setAvatarApi,
  }) {
    this._nameElement = document.querySelector(nameElement);
    this._jobElement = document.querySelector(jobElement);
    this._avatarElement = document.querySelector(avatarElement);
    this._nameInput = document.querySelector(nameSelector);
    this._abouInput = document.querySelector(aboutSelector);
    this._getApi = getApi;
    this._setProfileApi = setProfileApi;
    this._setAvatarApi = setAvatarApi;
  }

  // метод получения новых данных
  getUserInfo() {
    this._getApi()
      .then((data) => {
        this._nameInput.value = data.name;
        this._abouInput.value = data.about;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // принять данные, отправить на сервер и добавить на страницу
  setUserInfo(inputObj) {
    return this._setProfileApi(inputObj)
      .then((data) => {
        this._nameElement.textContent = data.name;
        this._jobElement.textContent = data.about;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  setUserAvatar(obj) {
    return this._setAvatarApi(obj)
      .then((data) => {
        this._avatarElement.src = data.avatar;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
