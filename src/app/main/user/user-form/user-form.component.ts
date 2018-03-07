import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NzModalSubject} from 'ng-zorro-antd';
import {UserService} from '../user.service';
import {HttpRes} from '../../../core/core.model';
import {MessageService} from '../../../core/message.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() operateType = 'add'; // edit
  @Input() userData = {
    id: 0,
    username: '',
    password: '',
    displayname: '',
    role: '1',
  };
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private subject: NzModalSubject,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [this.userData.username],
      password: [this.userData.password],
      displayname: [this.userData.displayname],
      role: [this.userData.role],
    });
  }
  onClickCancel() {
    this.subject.destroy();
  }
  onClickOk() {
    let params: any = {
      method: 'post'
    };
    if (this.operateType === 'edit') {
      params = {
        method: 'put',
        id: this.userData.id
      };
    }
    this.userService.postUsers(Object.assign({}, this.form.value, params)).subscribe((res: HttpRes) => {
      if (res.code === 0) {
        let text = '用户添加成功';
        if (this.operateType === 'edit') {
          text = '用户修改成功';
        }
        this.messageService.success(text);
        this.subject.destroy();
        this.userService.tableEvent.emit();
      }
    });
  }

}
