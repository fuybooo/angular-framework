import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {JsonpModule} from '@angular/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgZorroAntdModule, NZ_LOCALE, zhCN} from 'ng-zorro-antd';
import {environment} from '../../environments/environment';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpInterceptorService} from './http-interceptor.service';
import {CoreService} from './core.service';
import {DataService} from './data.service';
import {MessageService} from './message.service';
import {ModalService} from './modal.service';
import {UtilService} from './util.service';

export function createTranslateHttpLoader(http: any) {
  return new TranslateHttpLoader(http, environment.deployPath + '/assets/i18n/', '.json');
}
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JsonpModule,
    NgZorroAntdModule.forRoot({extraFontName: 'anticon', extraFontUrl: environment.deployPath + '/assets/fonts/iconfont'}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateHttpLoader,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [],
  providers: [
    {provide: NZ_LOCALE, useValue: zhCN},
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    CoreService,
    DataService,
    MessageService,
    ModalService,
    UtilService
  ]
})
export class CoreModule { }
