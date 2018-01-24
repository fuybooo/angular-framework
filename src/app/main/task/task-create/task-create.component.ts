import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
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
      field1: [],
      field2: [],
      field3: [],
      field4: [],
      field5: [],
      field6: [],
      field7: [],
      field8: [],
      field9: [],
      field10: [],
      field11: [],
    });
  }

}
