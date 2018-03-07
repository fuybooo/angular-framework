import { Component, OnInit } from '@angular/core';
import {Column} from '../../shared/component/table/table.model';
import {TaskService} from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  params = {
    companyname: '',
  };
  constructor(
    private taskService: TaskService
  ) {
  }

  ngOnInit() {
  }
  onSearch() {
    this.taskService.tableEvent.emit();
  }
}
