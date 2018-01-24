import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Injectable()
export class CoreService {
  localStorage_lngKey = '_lng_';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) { }
  getLng() {
    const localStorage_lng = localStorage.getItem(this.localStorage_lngKey);
    return localStorage_lng || environment.defaultLng;
  }
  setLng(lng) {
    localStorage.setItem(this.localStorage_lngKey, lng);
  }
  watchRoute() {
    (((((this.router.events
      .filter(event => event instanceof NavigationEnd) as Observable<any>)
      .map(() => this.activatedRoute)) as Observable<any>)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }) as Observable<any>)
      .filter(route => route.outlet === 'primary') as Observable<any>)
      .subscribe((route) => {
        this.titleService.setTitle(route.snapshot.data['title']);
      });
  }
  logout() {
    this.router.navigate(['/login']);
  }
}
