import { Injectable } from '@angular/core';
import { STUDENTS_KEY, USER_KEY } from '../../consts';


@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  defaultValue: { [key: string]: string } = {
    [STUDENTS_KEY]: '[]',
    [USER_KEY]: '',
  };

  get(key: string): string | null {
    const item = localStorage.getItem(key);
    if (!item && key === STUDENTS_KEY) {
      localStorage.setItem(key, this.defaultValue[key]);
      return this.defaultValue[key];
    } else {
      return item;
    }
  }

  set(key: string, value: object | string) {
    if (typeof value == 'object') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }
  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
