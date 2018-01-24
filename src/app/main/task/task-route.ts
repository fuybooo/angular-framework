import {Routes} from '@angular/router';
import {TaskComponent} from './task.component';
import {TaskCreateComponent} from './task-create/task-create.component';

export const taskRoutes: Routes = [
  {
    path: '',
    component: TaskComponent,
    data: {
      title: '任务列表'
    }
  },
  {
    path: 'taskCreate',
    component: TaskCreateComponent,
    data: {
      title: '新建任务'
    }
  }
];
