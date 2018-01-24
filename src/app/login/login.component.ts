import { Component, OnInit } from '@angular/core';
import {CoreService} from '../core/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private coreService: CoreService
  ) { }

  ngOnInit() {
    this.coreService.testCoreService();
  }

}
