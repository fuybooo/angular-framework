import { Component, OnInit } from '@angular/core';
import {TaskService} from './task.service';
import {NzModalService} from 'ng-zorro-antd';
import {TaskDetailComponent} from './task-detail/task-detail.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  current = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  sortValue = null;
  searchText = '';
  params = {};
  modal = null;

  sort(value) {
    this.sortValue = value;
    this.refreshData();
  }

  reset() {
    this.refreshData(true);
  }

  constructor(
    private taskService: TaskService,
    private nzModalService: NzModalService,
  ) {
  }

  refreshData(reset = false) {
    if (reset) {
      this.current = 1;
    }
    this.loading = true;
    this.taskService.getTaskList(this.params, (res: any) => {
      this.loading = false;
      this.total = res.data.total;
      this.dataSet = res.data.result;
    });
  }

  ngOnInit() {
    this.refreshData();
  }
  onSearch() {
    this.refreshData();
  }
  onClickTaskDetail(data) {
    this.modal = this.nzModalService.open({
      title: '任务详情',
      content: TaskDetailComponent,
      width: 1200,
      footer: false,
      componentParams: {
        data: data
      }
    });
  }
}
