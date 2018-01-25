import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpInterceptorService} from '../../core/http-interceptor.service';
import {TaskComponent} from './task.component';
import {taskRoutes} from './task-route';
import { TaskCreateComponent } from './task-create/task-create.component';
import {TaskService} from './task.service';
import { TaskDetailComponent } from './task-detail/task-detail.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(taskRoutes)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    TaskService
  ],
  entryComponents: [
    TaskDetailComponent
  ],
  declarations: [TaskComponent, TaskCreateComponent, TaskDetailComponent]
})
export class TaskModule { }
