import Service from '@ember/service';

const LOCALSTORAGE_KEY = 'popcorn';
const SESSIONSTORAGE_KEY = 'popcorn';

export default class LocalStorageService extends Service {

  #ssCache = {
    whoHasGone: [] // flat array
  }

  #lsCache = {
    lists: [] // array of arrays
  }

  #setupLocalStorage() {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.lsCache))
  }

}
