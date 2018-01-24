import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class CoreService {
  localStorage_lngKey = '_lng_';
  constructor() { }
  getLng() {
    const localStorage_lng = localStorage.getItem(this.localStorage_lngKey);
    return localStorage_lng || environment.defaultLng;
  }
  setLng(lng) {
    localStorage.setItem(this.localStorage_lngKey, lng);
  }
}
