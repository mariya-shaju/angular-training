import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  currentUrl!: string;
  constructor() {}

  setCurrentUrl = (url: string) => {
    this.currentUrl = url;
  };

  getCurrentUrl = () => {
    return this.currentUrl;
  };
}
