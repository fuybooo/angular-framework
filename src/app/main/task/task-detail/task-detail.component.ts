import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent implements OnInit {
  @Input() taskData: any = {};
  params: any = {};
  constructor(
  ) {
  }
  ngOnInit() {
    this.params.taskId = this.taskData.taskId;
  }
  onCLickDone() {

  }

}
