import {EventEmitter, Injectable} from '@angular/core';
import {DataService} from '../../core/data.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TaskService {
  tableEvent = new EventEmitter();
  constructor(
    private dataService: DataService,
    private http: HttpClient
  ) { }
  saveTask(type) {
    // 提交 保存
    return this.http.post(this.dataService.urls.save_task, {});
  }
  doneTask() {
    return this.http.post(this.dataService.urls.done_task, {});
  }
}
