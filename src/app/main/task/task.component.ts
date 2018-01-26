import { Component, OnInit } from '@angular/core';
import {TaskService} from './task.service';
import {NzModalService} from 'ng-zorro-antd';
import {TaskDetailComponent} from './task-detail/task-detail.component';
import {Column} from '../../shared/shared.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  columns: Column[] = [
    {
      title: '公司名称',
      field: 'field1',
    },
    {
      title: '事项',
      field: 'field2',
    },
  ];

  constructor(
  ) {
  }

  ngOnInit() {
  }
  onSearch() {
  }
}
