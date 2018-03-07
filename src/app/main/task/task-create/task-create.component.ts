import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../task.service';
import {NzModalSubject} from 'ng-zorro-antd';
import {HttpRes} from '../../../core/core.model';
import {MessageService} from '../../../core/message.service';
import {UserService} from '../../user/user.service';
import {Router} from '@angular/router';
import {LoginService} from '../../../login/login.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  @Input() isEdit = false;
  @Input() taskData = {
    id: '',
    taskname: '',
    companyname: '',
    amount: '',
    district: '',
    process: '',
    detaillist: '',
    remark: '',
    liableid: '',
    nextliableid: '',
  };
  form: FormGroup;
  field5Options = [];
  field6Options = [];
  stateArr = [
    {
      label: '绿灯',
      value: '1',
      checked: false,
    },
    {
      label: '黄灯',
      value: '2',
      checked: false,
    },
    {
      label: '红灯',
      value: '3',
      checked: true,
    },
  ];
  isAdmin = LoginService.isAdmin();
  formatterYuan = value => `￥${value}`;
  parserYuan = value => value.replace('￥', '');
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private userService: UserService,
    private subject: NzModalSubject,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    if (!this.isEdit) {
      this.userSearchChange();
    }
    this.form = this.fb.group({
      taskname: [this.taskData.taskname, [Validators.required, Validators.maxLength(100)]],
      companyname: [this.taskData.companyname, [this.moneyNotEmpty(), Validators.maxLength(100)]],
      amount: [this.taskData.amount, [Validators.required, Validators.maxLength(100)]],
      district: [this.taskData.district, [Validators.required, Validators.maxLength(100)]],
      process: [this.taskData.process, [Validators.required, Validators.maxLength(100)]],
      remark: [this.taskData.remark, [Validators.maxLength(100)]],
      liableid: [this.taskData.liableid, [Validators.required, Validators.maxLength(100)]],
      detaillist: [this.taskData.detaillist, [Validators.required, Validators.maxLength(100)]],
      nextliableid: [this.taskData.nextliableid, [Validators.maxLength(100)]],
    });
  }
  moneyNotEmpty() {
    return function(control: FormControl) {
      if (control.value === '￥' || control.value === 0) {
        return {error: true, required: true};
      } else {
        return null;
      }
    };
  }
  getFormControl(name) {
    return this.form.controls[name];
  }

  /**
   * 提交/保存任务
   * type = 1 提交
   * type = 2 保存
   * @param type
   */
  onClickSave(type) {
    let params: any = {
      method: 'post',
      issubmit: type,
      status: 0
    };
    if (this.isEdit) {
      params = {
        method: 'put',
        id: this.taskData.id,
        issubmit: type,
      };
    }
    this.taskService.postTasks(Object.assign({}, this.form.value, params)).subscribe((res: HttpRes) => {
      if (res.code === 0) {
        let text = '保存成功';
        if (type === 2) {
          text = '提交成功';
        }
        this.messageService.success(text);
        this.taskService.tableEvent.emit({isTaskDetail: false});
        this.form.reset();
        this.subject.destroy();
        this.router.navigate(['/main/taskList']);
      }
    });
  }
  onClickCancel() {
    // 只有在弹框时才出现
    this.subject.destroy();
  }
  userSearchChange(value?, type?) {
    this.userService.getUsers({
      search: value || '',
      page: 1,
      per_page: 10
    }).subscribe((res: HttpRes) => {
      // if (res.code === 0) {
        const result = res.data.result || [];
        if (type === 1) {
          this.field5Options = result;
        } else if (type === 2) {
          this.field6Options = result;
        } else {
          this.field5Options = result;
          this.field6Options = result;
        }
      // }
    });
  }
  stateChange(state) {
    state.checked = !state.checked;
    this.stateArr.forEach((item: any) => {
      item.checked = item.value === state.value;
    });
  }
}
