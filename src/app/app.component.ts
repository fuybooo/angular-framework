import { Component } from '@angular/core';
import {CoreService} from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private coreService: CoreService) {
    this.coreService.watchRoute();
  }
}
