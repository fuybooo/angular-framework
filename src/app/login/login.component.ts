import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpRes} from '../core/core.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
  login() {
    this.loginService.login(this.form.value).subscribe((res: HttpRes) => {
      if (res.code === 200) {
        // 测试
        res.data.name = this.form.value.userName;
        // 测试 end
        LoginService.saveLoginInfo(res.data);
        this.router.navigate(['/main']);
      }
    });
  }
}
