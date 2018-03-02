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
  postTasks(params) {
    return this.http.post(this.dataService.urls.tasks, params);
  }
  saveTask(params) {
    // 提交 保存
    return this.http.post(this.dataService.urls.save_task, params);
  }
  doneTask(params) {
    return this.http.post(this.dataService.urls.done_task, params);
  }
  getUserList(params) {
    return this.http.get(this.dataService.urls.user_list, this.dataService.getWholeParams(params));
  }
}
