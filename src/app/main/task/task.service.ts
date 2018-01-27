import {EventEmitter, Injectable} from '@angular/core';
import {DataService} from '../../core/data.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TaskService {
  taskTableEvent = new EventEmitter();
  constructor(
    private dataService: DataService,
    private http: HttpClient
  ) { }
  getTaskList(params, callback) {
     this.http.get(this.dataService.urls.task_list, this.dataService.getWholeParams(params)).subscribe((res: any) => {
       callback(res);
     });
  }
  saveTask() {
    // 提交 保存
  }
}
