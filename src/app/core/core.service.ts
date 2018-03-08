import {EventEmitter, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import {loginInfoKey} from '../shared/shared.model';

@Injectable()
export class CoreService {
  localStorage_lngKey = '_lng_';
  routeChangeEvent = new EventEmitter();
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
        this.routeChangeEvent.emit();
      });
  }
  logout() {
    localStorage.removeItem(loginInfoKey);
    this.router.navigate(['/login']);
  }
}
