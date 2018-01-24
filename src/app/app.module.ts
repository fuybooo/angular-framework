import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {appRoutes} from './app-route';
import {PreloadAllModules, RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    RouterModule.forRoot(appRoutes, {useHash: true, preloadingStrategy: PreloadAllModules})
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
