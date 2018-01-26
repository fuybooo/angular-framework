import { Component, OnInit } from '@angular/core';
import {Column} from '../../shared/shared.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  columns: Column[] = [
    {
      title: '字段1',
      field: 'field1',
      sortable: true
    },
    {
      title: '字段2',
      field: 'field2',
      formatter: v => {
        if (v) {
          return '<i class="anticon anticon-check"></i>';
        } else {
          return '<i class="anticon anticon-close"></i>';
        }
      }
    },
    {
      title: '字段3',
      field: 'field3',
      formatter: v => `${v}00000`
    },
    {
      title: '操作',
      isOperate: true,
      event: {
        edit: true,
        del: true
      }
    }
  ];
  data = [];
  url = 'test_list';
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 100; i ++) {
      this.data.push({
        field1: `abc${i}`,
        field2: Math.random() > 0.5 ? 1 : 0,
        field3: `abc${i}`,
      });
    }
    console.log(this.data);
  }
  edit(value, index, row) {
    console.log('执行edit', value, index, row);
  }

}
