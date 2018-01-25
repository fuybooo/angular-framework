import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

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
  formatterYuan = value => `￥${value}`;
  parserYuan = value => value.replace('￥', '');
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      field1: [this.taskData.field1],
      field2: [this.taskData.field2],
      field3: [this.taskData.field3],
      field4: [this.taskData.field4],
      field5: [this.taskData.field5],
      field6: [this.taskData.field6],
      field7: [this.taskData.field7],
      field8: [this.taskData.field8],
      field9: [this.taskData.field9],
      field10: [this.taskData.field10],
      field11: [this.taskData.field11],
    });
  }

}
