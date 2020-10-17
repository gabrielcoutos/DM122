const BOUGHT = 'bought';

export default class HtmlService {

  constructor(listService) {
    this.listService = listService;
    this.total = 0;
    this.bindFormEvent();
    this.listBuy();
  }

  bindFormEvent() {
    const form = document.querySelector('form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      this.addItem(form.item.value, form.price_item.value);
      form.reset();
    })
  }

  async addItem(description, price) {
    const item = { description, price, bought: false };
    const itemId = await this.listService.save(item);
    item.id = itemId;
    this.addToHtmlList(item);
  }

  async listBuy() {
    const items = await this.listService.getAll();
    items.forEach(item => this.addToHtmlList(item));
  }

  async saveItem(itemId, isBought) {
    const item = await this.listService.get(itemId);
    item.bought = isBought;
    this.listService.save(item);
  }

  toggleBuy(li) {
    const itemId = +li.getAttribute('data-item-id');
    li.classList.toggle(BOUGHT);
    const isBought = li.classList.contains(BOUGHT);
    this.saveItem(itemId, isBought);
  }

  async deleteBuy(li) {
    const itemId = +li.getAttribute('data-item-id');
    const itemPrice = +li.getAttribute('data-item-price');
    const total = document.querySelector('#value');

    const price = parseFloat(itemPrice)
    this.total -= price
    this.total = parseFloat(this.total.toFixed(2))
    total.textContent = "R$ " + this.total

    await this.listService.delete(itemId);
    li.remove();
  }

  addToHtmlList(item) {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');
    const total = document.querySelector('#value');

    li.setAttribute('data-item-id', item.id);
    li.setAttribute('data-item-price', item.price)
    li.addEventListener('click', () => this.toggleBuy(li));
    console.log(item)

    span.textContent = item.description + "  R$ "+ item.price;
    const price = parseFloat(item.price)

    this.total += price
    this.total = parseFloat(this.total.toFixed(2))

    total.textContent = "R$ " + this.total

    button.textContent = 'x';
    button.addEventListener('click', event => {
      event.stopPropagation();
      this.deleteBuy(li);
    });

    if (item.bought) {
      li.classList.add(BOUGHT);
    }

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);
  }
}
