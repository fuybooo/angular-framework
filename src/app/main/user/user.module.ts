import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpInterceptorService} from '../../core/http-interceptor.service';
import {UserComponent} from './user.component';
import {userRoutes} from './user-route';
import { UserFormComponent } from './user-form/user-form.component';
import {UserService} from './user.service';
import { UserTableComponent } from './user-table/user-table.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    UserService
  ],
  entryComponents: [
    UserFormComponent
  ],
  declarations: [UserComponent, UserFormComponent, UserTableComponent]
})
export class UserModule { }
