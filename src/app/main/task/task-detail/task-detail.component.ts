import { Component, OnInit } from '@angular/core';
import {TaskService} from '../task.service';
import {NzModalService} from 'ng-zorro-antd';
import {TaskCreateComponent} from '../task-create/task-create.component';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  current = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  params = {};
  field5 = '';
  field5Options = [
    {
      label: '张三',
      value: 'zs'
    },
    {
      label: '李四',
      value: 'ls'
    },
    {
      label: '王五',
      value: 'ww'
    },
  ];
  modal = null;

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
  onClickEdit(data) {
    this.nzModalService.open({
      title: '编辑任务',
      content: TaskCreateComponent,
      width: 1000,
      footer: false,
      zIndex: 1020,
      componentParams: {
        taskData: data
      }
    });
  }

  onClickSubmit(data, content) {
    this.nzModalService.open({
      title: '选择下一步负责人',
      content: content,
      width: 400,
      zIndex: 1030
    });
  }
  onCLickAdd() {
    this.nzModalService.open({
      title: '添加任务',
      content: TaskCreateComponent,
      width: 1000,
      footer: false,
      zIndex: 1020
    });
  }

}
