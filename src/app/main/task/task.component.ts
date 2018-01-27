import { Component, OnInit } from '@angular/core';
import {Column} from '../../shared/component/table/table.model';
import {TaskService} from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  params = {
    search: ''
  };
  constructor(
    private taskService: TaskService
  ) {
  }

  ngOnInit() {
  }
  onSearch() {
    this.taskService.taskTableEvent.emit();
  }
}
