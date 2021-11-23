export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // массив данных
    this._renderer = renderer; // функция
		this._container = document.querySelector(containerSelector);
  }

  // Метод добавления элемента в контейнер
    addItem(element) {
      this._container.append(element);
    }

  // Метод отрисовки всех элементов
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    })
  }

}
