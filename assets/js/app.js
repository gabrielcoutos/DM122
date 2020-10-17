import HtmlService from './HtmlService.js';
import ListService from './ListService.js';

class App {

  constructor() {
    this.registerServiceWorker();
    this.start();
  }

  start() {
    const listService = new ListService();
    new HtmlService(listService);
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      const onsuccess = () => console.log('[Service Worker] Registered');
      const onfailure = () => console.log('[Service Worker] Failed');

      navigator.serviceWorker
        .register('sw.js')
        .then(onsuccess)
        .catch(onfailure);
    }
  }
}

new App();
