import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpInterceptorService} from '../../core/http-interceptor.service';
import {UserComponent} from './user.component';
import {userRoutes} from './user-route';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  entryComponents: [
    UserFormComponent
  ],
  declarations: [UserComponent, UserFormComponent]
})
export class UserModule { }
