import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {SettingsComponent} from './settings.component';
import {settingsRoutes} from './settings-route';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(settingsRoutes)
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
