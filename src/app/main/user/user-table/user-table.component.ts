import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserFormComponent} from '../user-form/user-form.component';
import {NzModalService} from 'ng-zorro-antd';
import {ModalService} from '../../../core/modal.service';
import {Column} from '../../../shared/component/table/table.model';
import {UserService} from '../user.service';
import {TableService} from '../../../shared/component/table/table.service';
import {HttpRes} from '../../../core/core.model';
import {MessageService} from '../../../core/message.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  providers: [TableService]
})
export class UserTableComponent implements OnInit, OnDestroy {
  @Input() isCheckbox = false;
  @Input() params = {};
  @Input() url = 'user_list';
  columns: Column[] = [
    {
      title: '序号',
      isOrder: true,
    },
    {
      title: '用户名',
      field: 'userName',
    },
    {
      title: '姓名',
      field: 'realName',
    },
    {
      title: '权限',
      field: 'permission',
      formatter: v => {
        let res = '';
        if (v === 1) {
          res = '普通用户';
        } else if (v === 2) {
          res = '管理员';
        }
        return res;
      }
    },
    {
      title: '操作',
      isOperate: true,
    },
  ];
  modal;
  subscript;
  constructor(
    private nzModalService: NzModalService,
    private modalService: ModalService,
    private userService: UserService,
    public tableService: TableService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.initSearch();
    this.subscript = this.userService.tableEvent.subscribe(() => {
      this.initSearch();
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
  initSearch() {
    this.tableService.initTable({
      url: this.url,
      columns: this.columns,
      isCheckbox: this.isCheckbox,
      params: this.params,
    });
  }
  onClickEdit(data) {
    this.modal = this.nzModalService.open({
      title: '编辑',
      content: UserFormComponent,
      width: 600,
      footer: false,
      componentParams: {
        userData: data,
        operateType: 'edit'
      }
    });
  }
  onClickDel(data) {
    this.modal = this.modalService.confirmDelete(() => {
      this.userService.delUser({id: data.userId}).subscribe((res: HttpRes) => {
        if (res.code === '200') {
          this.messageService.success('删除成功');
          this.userService.tableEvent.emit();
        }
      });
    });
  }
}
