import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  myStorage = window.localStorage;

  constructor() { }

  set(type, data) {
    this.myStorage.setItem(type, data);
  }

  get(item) {
    return this.myStorage.getItem(item);
  }

  remove(item) {
    this.myStorage.removeItem(item);
  }

  clearAll() {
    this.myStorage.clear();
  }
  setLocalStorageMultipleData(obj) {
    for (var key in obj) {
      this.set(key, obj[key]);
    }
  }
}
