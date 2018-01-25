import { Component, OnInit } from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';
import {UserFormComponent} from './user-form/user-form.component';
import {UserService} from './user.service';
import {ModalService} from '../../core/modal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  displayData: Array<any> = [];
  dataSet = [];
  indeterminate = false;
  total = 1;
  current = 1;
  pageSize = 10;
  modal;
  constructor(
    private nzModalService: NzModalService,
    private userService: UserService,
    private modalService: ModalService,
    private router: Router,
  ) {
  }
  displayDataChange($event) {
    this.displayData = $event;
  }

  refreshStatus() {
    const allChecked = this.displayData.every(value => value.checked === true);
    const allUnChecked = this.displayData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.dataSet.some(value => value.checked);
    this.checkedNumber = this.dataSet.filter(value => value.checked).length;
  }

  checkAll(value) {
    if (value) {
      this.displayData.forEach(data => data.checked = true);
    } else {
      this.displayData.forEach(data => data.checked = false);
    }
    this.refreshStatus();
  }

  ngOnInit() {
    this.userService.getUserList({}, (res: any) => {
      this.dataSet = res.data.result;
      this.total = res.data.total;
    });
  }
  onCLickAdd() {
    this.modal = this.nzModalService.open({
      title: '添加人员',
      content: UserFormComponent,
      width: 800,
      footer: false,
    });
  }
  onClickEdit(data) {
    this.modal = this.nzModalService.open({
      title: '修改',
      content: UserFormComponent,
      width: 800,
      footer: false,
      componentParams: {
        userData: data
      }
    });
  }
  onClickDel(data) {
    this.modalService.confirmDelete(() => {
      this.dataSet.splice(
        this.dataSet.findIndex(value => value.email === data.email), 1
      );
    });
  }
}
