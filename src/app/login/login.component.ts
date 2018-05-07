import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpRes} from '../core/core.model';
import {Router} from '@angular/router';
import {MessageService} from '../core/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private messageService: MessageService,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
  login() {
    if (this.form.invalid) {
      return;
    }
    this.loginService.login({
      username: this.form.controls.username.value,
      password: this.form.controls.password.value,
      method: 'post'
    }).subscribe((res: HttpRes) => {
      if (res.code === 0) {
        if (res.msg === '登录失败') {
          this.messageService.error('用户名密码错误！');
          return;
        }
        LoginService.saveLoginInfo(res.data.result);
        this.router.navigate(['/main']);
      }
    });
  }
}
