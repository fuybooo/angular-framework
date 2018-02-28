import { Component, OnInit } from '@angular/core';
import {Column} from '../../shared/component/table/table.model';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
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
  ];
  data = [];
  list: any[] = [];
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

    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        disabled: i % 3 < 1,
      });
    }

  }

}
