import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
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
