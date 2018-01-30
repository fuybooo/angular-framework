import { Component, OnInit } from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';
import {UserFormComponent} from './user-form/user-form.component';
import {UserService} from './user.service';
import {ModalService} from '../../core/modal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  params = {
    search: ''
  };
  modal;
  constructor(
    private nzModalService: NzModalService,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
  }
  onCLickAdd() {
    this.modal = this.nzModalService.open({
      title: '添加人员',
      content: UserFormComponent,
      width: 600,
      footer: false,
    });
  }
  onSearch() {
    // 触发表格的刷新
    this.userService.tableEvent.emit();
  }
}
