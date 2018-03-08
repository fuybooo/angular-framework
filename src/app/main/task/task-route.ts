import {Routes} from '@angular/router';
import {TaskComponent} from './task.component';
import {TaskCreateComponent} from './task-create/task-create.component';

export const taskRoutes: Routes = [
  {
    path: 'taskCreate',
    component: TaskCreateComponent,
    data: {
      title: '新建任务'
    }
  },
  {
    path: '',
    component: TaskComponent,
    data: {
      title: '任务列表'
    }
  },
];
