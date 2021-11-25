export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // массив данных
    this._renderer = renderer; // функция
    this._container = document.querySelector(containerSelector);
  }

  // Метод добавления элемента в контейнер
  addItem(item) {
    this._container.prepend(this._renderer(item));
  }

  // Метод отрисовки всех элементов
  renderItems(cards) {
    cards.forEach((item) => {
      this._container.append(this._renderer(item));
    });
  }
}
