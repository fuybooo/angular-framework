import {EventEmitter, Injectable} from '@angular/core';
import {DataService} from '../../core/data.service';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../../login/login.service';

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

  /**
   * 根据当前人员信息判断是否显示按钮
   */
  isShowOpBtn(data) {
    let flag = false;
    const loginInfo = LoginService.getLoginInfo();
    if (loginInfo && data.issubmit !== '1') {
      if (loginInfo.role === '2') {
        flag = true;
      } else if (loginInfo.role === '1') {
        if (loginInfo.id === data.liableid) {
          flag = true;
        }
      }
    }
    return flag;
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
