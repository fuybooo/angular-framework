import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TableService} from '../../../shared/component/table/table.service';
import {Column} from '../../../shared/component/table/table.model';
import {NzModalService} from 'ng-zorro-antd';
import {TaskDetailComponent} from '../task-detail/task-detail.component';
import {TaskCreateComponent} from '../task-create/task-create.component';
import {TaskService} from '../task.service';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css'],
  providers: [TableService]
})
export class TaskTableComponent implements OnInit, OnDestroy {
  @Input() isCheckbox = false;
  @Input() isTaskDetail = false;
  @Input() params = {};
  @Input() url = 'task_list';
  columns: Column[] = [
    {
      title: '序号',
      isOrder: true,
    },
    {
      title: '公司名称',
      field: 'field1',
    },
    {
      title: '事项',
      field: 'field2',
    },
    {
      title: '区域',
      field: 'field3',
    },
    {
      title: '收费',
      field: 'field4',
    },
    {
      title: '交接单列表',
      field: 'field5',
    },
    {
      title: '负责人',
      field: 'field6',
    },
    {
      title: '开始时间',
      field: 'field7',
    },
    {
      title: '已用工作日',
      field: 'field8',
    },
    {
      title: '进程',
      field: 'field9',
    },
    {
      title: '状态',
      field: 'field10',
      formatter: (v) => {
        let res = '<i class="anticon anticon-close-circle-o"></i>';
        if (v === 1) {
          res = '<i class="anticon anticon-check-circle-o"></i>';
        }
        return res;
      }
    },
    {
      title: '备注',
      field: 'field11',
    },
    {
      title: '操作',
      isOperate: true,
      event: {
        detail: true,
      }
    },
  ];
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
  modal;
  subscript;
  constructor(
    public tableService: TableService,
    public taskService: TaskService,
    private nzModalService: NzModalService
  ) { }

  ngOnInit() {
    if (this.isTaskDetail) {
      const operateCol = this.columns.find(v => v.isOperate);
      operateCol.event.detail = false;
      operateCol.event.submit = true;
      operateCol.event.edit = true;
    }
    this.initSearch();
    this.subscript = this.taskService.taskTableEvent.subscribe(() => {
      this.initSearch();
    });
  }
  initSearch() {
    this.tableService.initTable({
      url: this.url,
      columns: this.columns,
      isCheckbox: this.isCheckbox,
      params: this.params,
    });
  }
  ngOnDestroy() {
    if (this.subscript) {
      this.subscript.unsubscribe();
    }
  }
  onClickDetail(data) {
    this.modal = this.nzModalService.open({
      title: '任务详情',
      content: TaskDetailComponent,
      width: 1200,
      footer: false,
      componentParams: {
        // taskData: data
        // test
        taskData: {taskId: 1},
      }
    });
  }
  onClickEdit(data) {
    this.modal = this.nzModalService.open({
      title: '编辑任务',
      content: TaskCreateComponent,
      width: 1000,
      footer: false,
      zIndex: 1020,
      componentParams: {
        taskData: data,
        isEdit: true
      }
    });
  }

  onClickSubmit(data, content) {
    this.modal = this.nzModalService.open({
      title: '选择下一步负责人',
      content: content,
      width: 400,
      zIndex: 1030
    });
  }

}
