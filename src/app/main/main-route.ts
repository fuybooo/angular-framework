import {Routes} from '@angular/router';
import {MainComponent} from './main.component';

export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/main/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'settings',
        loadChildren: 'app/main/settings/settings.module#SettingsModule'
      }
    ]
  },
];
