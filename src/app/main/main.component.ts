import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CoreService} from '../core/core.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isCollapsed = false;
  isImgCollapsed = false;
  currentItem;
  navList: any = [];
  currentUser = {
    name: '张三'
  };
  constructor(
    private router: Router,
    private coreService: CoreService,
  ) { }

  ngOnInit() {
    this.initNavList();
  }
  initNavList() {
    this.navList = [
      {
        label: '新建任务',
        code: 'taskCreate',
        route: '/main',
        iconCls: {'anticon-file-add': true},
        isActive: false
      },
      {
        label: '任务列表',
        code: 'taskList',
        route: '/main/taskList',
        iconCls: {'anticon-bars': true},
        isActive: true
      },
      {
        label: '人员管理',
        route: '/main/user',
        code: 'userManagement',
        iconCls: {'anticon-team': true},
        isActive: false
      },
    ];
    this.navList.forEach(item => {
      if (item.route === this.router.routerState.snapshot.url) {
        item.isActive = true;
        this.currentItem = item;
      } else {
        item.isActive = false;
      }
    });
  }
  switchSide() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      // 图片延迟变小
      setTimeout(() => this.isImgCollapsed = true, 150);
    } else {
      // 直接变大
      this.isImgCollapsed = false;
    }
  }
  onClickItem(item) {
    this.currentItem = item;
    this.navList.map(value => value.isActive = (item.code === value.code));
    this.router.navigate([item.route]);
  }
  logout() {
    this.coreService.logout();
  }

}
