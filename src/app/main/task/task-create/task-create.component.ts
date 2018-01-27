import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../task.service';
import {NzModalSubject} from 'ng-zorro-antd';
import {HttpRes} from '../../../core/core.model';
import {MessageService} from '../../../core/message.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  @Input() taskData = {
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
    field7: '',
    field8: '',
    field9: '',
    field10: '',
    field11: '',
  };
  @Input() isEdit = false;
  form: FormGroup;
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
  field6Options = [
    {
      label: '张三封',
      value: 'zs'
    },
    {
      label: '李四海',
      value: 'ls'
    },
    {
      label: '王五福',
      value: 'ww'
    },
  ];
  field10Options = [
    {
      label: '红',
      value: 1
    },
    {
      label: '黄',
      value: 2
    },
    {
      label: '绿',
      value: 3
    },
  ];
  formatterYuan = value => `￥${value}`;
  parserYuan = value => value.replace('￥', '');
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private subject: NzModalSubject,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      field1: [this.taskData.field1, [Validators.required, Validators.maxLength(100)]],
      field2: [this.taskData.field2, [this.moneyNotEmpty(), Validators.maxLength(100)]],
      field3: [this.taskData.field3, [Validators.required, Validators.maxLength(100)]],
      field4: [this.taskData.field4, [Validators.required, Validators.maxLength(100)]],
      field5: [this.taskData.field5, [Validators.required, Validators.maxLength(100)]],
      field6: [this.taskData.field6, [Validators.maxLength(100)]],
      field7: [this.taskData.field7, [Validators.required, Validators.maxLength(100)]],
      field8: [this.taskData.field8, [Validators.required, Validators.maxLength(100)]],
      field9: [this.taskData.field9, [Validators.maxLength(100)]],
      field10: [this.taskData.field10],
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
    this.taskService.saveTask(type).subscribe((res: HttpRes) => {
      if (res.code === '200') {
        let text = '保存成功';
        if (type === 2) {
          text = '提交成功';
        }
        this.messageService.success(text);
        this.taskService.tableEvent.emit({isTaskDetail: false});
        this.subject.destroy();
      }
    });
  }
  onClickCancel() {
    // 只有在弹框时才出现
    this.subject.destroy();
  }
}
