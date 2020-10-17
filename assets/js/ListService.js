import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@3.0.2/dist/dexie.mjs';

let db;

export default class ListService {

  constructor() {
    this.initializeDB();
  }

  initializeDB() {
    db = new Dexie('listBuyDB');

    db.version(5).stores({
      items: '++id,description,price'
    });

    db.on('populate', async () => {
      console.log('It runs only once!');
      await db.items.bulkPut([
        { description: 'Banana', price: '2.99', bought: true },
        { description: 'Pizza', price: '10', bought: false },
        { description: 'Rice',  price: '27.65', bought: false },
        { description: 'Bean',  price: '7.89', bought: true }
      ]);
    });
  }

  getAll() {
    return db.items.toArray();
  }

  get(id) {
    return db.items.get(id);
  }

  save(item) {
    return db.items.put(item);
  }

  delete(id) {
    return db.items.delete(id);
  }
}
