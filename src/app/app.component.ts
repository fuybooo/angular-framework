import { Component } from '@angular/core';
import {CoreService} from './core/core.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private coreService: CoreService,
    private translateService: TranslateService
  ) {
    this.coreService.watchRoute();
    this.translateService.addLangs([
      'zh',
      'en'
    ]);
    this.translateService.setDefaultLang(this.coreService.getLng());
    this.translateService.use(this.coreService.getLng());
  }
}
