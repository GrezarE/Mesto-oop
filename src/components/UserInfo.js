export default class UserInfo {
  constructor({ nameSelector, aboutSelector, getApi }) {
    this._nameInput = document.querySelector(nameSelector);
    this._abouInput = document.querySelector(aboutSelector);
    this._getApi = getApi;
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

  }
}
