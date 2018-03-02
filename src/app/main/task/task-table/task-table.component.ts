import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TableService} from '../../../shared/component/table/table.service';
import {Column} from '../../../shared/component/table/table.model';
import {NzModalService} from 'ng-zorro-antd';
import {TaskDetailComponent} from '../task-detail/task-detail.component';
import {TaskCreateComponent} from '../task-create/task-create.component';
import {TaskService} from '../task.service';
import {HttpRes} from '../../../core/core.model';
import {MessageService} from '../../../core/message.service';
import {ModalService} from '../../../core/modal.service';
import * as moment from 'moment';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
  providers: [TableService]
})
export class TaskTableComponent implements OnInit, OnDestroy {
  @Input() isCheckbox = false;
  @Input() isTaskDetail = false;
  @Input() params = {};
  @Input() url = 'tasks';
  columns: Column[] = [
    {
      title: '序号',
      isOrder: true,
      width: '5%'
    },
    {
      title: '公司名称',
      field: 'companyname',
      width: '8%'
    },
    {
      title: '事项',
      field: 'taskname',
      width: '8%'
    },
    {
      title: '区域',
      field: 'district',
      width: '8%'
    },
    {
      title: '金额',
      field: 'amount',
      width: '7%'
    },
    {
      title: '交接单列表',
      field: 'detaillist',
      width: '9%'
    },
    {
      title: '负责人',
      field: 'liablename',
      width: '8%'
    },
    {
      title: '开始时间',
      field: 'begindate',
      width: '11%',
      formatter: (v) => {
        return v ? `<span>${moment(v).format('YYYY-MM-DD HH:mm:ss')}</span>` : '';
      }
    },
    {
      title: '已用工作日',
      field: 'enddate',
      width: '8%'
    },
    {
      title: '进程',
      field: 'process',
      width: '8%'
    },
    {
      title: '状态',
      field: 'status',
      width: '6%',
      formatter: (v) => {
        let res = '<i class="anticon anticon-close-circle-o"></i>';
        if (v === '1') {
          res = '<i class="anticon anticon-check-circle-o"></i>';
        }
        return res;
      }
    },
    {
      title: '备注',
      field: 'remark',
      width: '10%'
    },
    {
      title: '操作',
      isOperate: true,
    },
  ];
  liableid = '';
  liablenameOptions = [
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
    private nzModalService: NzModalService,
    private messageService: MessageService,
    private modalService: ModalService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getUsers({
      page: 1,
      per_page: 10
    }).subscribe((res: HttpRes) => {
      if (res.code === 0) {
        this.liablenameOptions = res.data.result;
      }
    });
    // 根据不同页面重新设置columns的宽度
    if (this.isTaskDetail) {
      this.columns.find(v => v.field === 'taskname').width = '6%';
      this.columns.find(v => v.field === 'amount').width = '6%';
      this.columns.find(v => v.field === 'liablename').width = '6%';
    }
    this.initSearch();
    this.subscript = this.taskService.tableEvent.subscribe((event) => {
      // 指定任务详情组件在event.isTaskDetail为false时不订阅该事件
      if (event && event.isTaskDetail === false) {
        // todo 目前只有两处用到该组件,如果将来用到该组件的地方增加了,此处的逻辑需要改变
        if (!this.isTaskDetail) {
          this.initSearch();
        }
      } else {
        this.initSearch();
      }
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
    if (this.modal) {
      this.modal.destroy();
    }
  }
  onClickDetail(data) {
    this.modal = this.nzModalService.open({
      title: '任务详情',
      content: TaskDetailComponent,
      width: 1200,
      footer: false,
      componentParams: {
        taskData: data,
        subscript: this.subscript
      }
    });
    this.modal.subscribe(event => {
      if (event.type === 'done') {
        this.modalService.popupConfirm('确定彻底完成该任务吗?', () => {
          this.taskService.postTasks({
            method: 'put',
            issubmit: '1',
            id: data.id
          }).subscribe((res: HttpRes) => {
            if (res.code === 200) {
              this.messageService.success('任务已完成!');
              this.modal.destroy();
              // 指定特定的组件触发订阅事件,这里不需要触发任务详情组件的订阅事件
              this.taskService.tableEvent.emit({isTaskDetail: false});
            }
          });
        });
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
      zIndex: 1030,
      onOk: () => {
        this.taskService.postTasks({
          method: 'put',
          status: 0,
          issubmit: 1,
          id: data.id,
          liableid: this.liableid
        }).subscribe((res: HttpRes) => {
          if (res.code === 0) {
          // if (res.code === 200) {
            this.messageService.success('提交成功');
            this.taskService.tableEvent.emit();
          }
        });
      }
    });
  }

}
