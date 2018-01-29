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
    userName: '',
    password: '',
    realName: '',
    permission: 1,
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
      userName: [this.userData.userName],
      password: [this.userData.password],
      realName: [this.userData.realName],
      permission: [this.userData.permission],
    });
  }
  onClickCancel() {
    this.subject.destroy();
  }
  onClickOk() {
    this.userService.saveUser(Object.assign(this.form.value, {operateType: this.operateType})).subscribe((res: HttpRes) => {
      if (res.code === '200') {
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
