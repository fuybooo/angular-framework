import {Routes} from '@angular/router';
import {LoginComponent} from './login.component';
import {LoginResetPasswordComponent} from './login-reset-password/login-reset-password.component';

export const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'resetPassword',
    component: LoginResetPasswordComponent
  }
];
