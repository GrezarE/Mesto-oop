export default class UserInfo {
  constructor({ nameElement, jobElement, nameSelector, aboutSelector, getApi, setProfileApi, setAvatarApi }) {
    this._nameElement = document.querySelector(nameElement);
    this._jobElement = document.querySelector(jobElement);
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
  }

  // принять данные, отправить на сервер и добавить на страницу
  setUserInfo(){
    return this._setProfileApi()
      .then((data) => {
        console.log(data);
        this._nameElement.textContent = data.name;
        this._jobElement.textContent = data.about;
      })
  }
}
