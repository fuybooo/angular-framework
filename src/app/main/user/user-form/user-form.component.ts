import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() userData = {
    username: '',
    password: '',
    realName: '',
    permission: 1,
  };
  form: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [this.userData.username],
      password: [this.userData.password],
      realName: [this.userData.realName],
      permission: [this.userData.permission],
    });
  }

}
