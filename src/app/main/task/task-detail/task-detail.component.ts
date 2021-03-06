import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {HttpRes} from '../../../core/core.model';
import {MessageService} from '../../../core/message.service';
import {ModalService} from '../../../core/modal.service';
import {NzModalSubject} from 'ng-zorro-antd';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  @Input() taskData: any = {};
  params: any = {};
  constructor(
    public taskService: TaskService,
    private messageService: MessageService,
    private modalService: ModalService,
    private subject: NzModalSubject
  ) {
  }
  ngOnInit() {
    this.params.taskkey = this.taskData.taskkey;
  }
  ngOnDestroy() {
  }
  onClickDone() {
    this.subject.next({type: 'done'});
  }

}
