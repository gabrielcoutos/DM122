import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@3.0.2/dist/dexie.mjs';

let db;

export default class ListService {

  constructor() {
    this.initializeDB();
  }

  initializeDB() {
    db = new Dexie('listBuyDB');

    db.version(2).stores({
      items: '++id,description'
    });

    db.on('populate', async () => {
      console.log('It runs only once!');
      await db.items.bulkPut([
        { description: 'Banana', bought: true },
        { description: 'Pizza', bought: false },
        { description: 'Rice', bought: false },
        { description: 'Bean', bought: true }
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
