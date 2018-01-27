import {EventEmitter, Injectable} from '@angular/core';
import {Column} from './table.model';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../../core/data.service';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class TableService {
  allChecked = false;
  displayData: Array<any> = [];
  indeterminate = false;
  dataSet = [];
  loading = false;
  total = 1;
  current = 1;
  pageSize = 10;
  sortMap = {};
  url;
  params: any = {
    pageSize: 10,
    pageNumber: 1,
    sortField: '',
    sortOrder: ''
  };
  columns: Column[] = [];
  syncData = [];
  isCheckbox = true;
  tableSize = 'middle';

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private domSanitizer: DomSanitizer,
  ) { }

  initTable(props) {
    for (const i in props) {
      if (props.hasOwnProperty(i)) {
        if (i === 'params') {
          Object.assign(this.params, props[i]);
        } else {
          this[i] = props[i];
        }
      }
    }
    for (const col of this.columns) {
      if (col.field) {
        this.sortMap[col.field] = null;
      }
    }
    if (!this.syncData.length) {
      this.search(true);
    }
  }
  displayDataChange($event) {
    this.displayData = $event;
  }

  refreshStatus() {
    // 判断是否每一项都被选中
    const allChecked = this.displayData.every(value => value.checked === true);
    // 判断是否每一项都未被选中
    const allUnChecked = this.displayData.every(value => !value.checked);
    this.allChecked = allChecked;
    // 非全选且非全不选,即有部分项被选中
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value) {
    if (value) {
      // 将每一项设为选中
      this.displayData.forEach(data => data.checked = true);
    } else {
      // 将每一项设为不选中
      this.displayData.forEach(data => data.checked = false);
    }
    this.refreshStatus();
  }
  search(reset = false) {
    if (reset) {
      this.current = 1;
    }
    this.loading = true;
    if (!this.syncData.length) {
      this.params.pageNumber = this.current;
      this.params.pageSize = this.pageSize;
    }
    this.http.get(this.dataService.urls[this.url], this.dataService.getWholeParams(this.params)).subscribe((res: any) => {
      this.loading = false;
      if (res.code === '200') {
        // 远程环境中
        this.displayData = this.dataSet = res.data.result;
        this.total = res.data.total;
      }
    });
  }
  sort(field, value) {
    this.sortMap[field] = value;
    // 本地数据
    if (this.syncData.length) {
      this.syncData = [...this.syncData.sort((a, b) => {
        if (a[field] > b[field]) {
          return (value === 'ascend') ? 1 : -1;
        } else if (a[field] < b[field]) {
          return (value === 'ascend') ? -1 : 1;
        } else {
          return 0;
        }
      })];
    } else {
      // 远程数据
      this.params.sortField = field;
      this.params.sortOrder = value;
      this.search(true);
    }
  }
  getSecurityHtml(col, i, data) {
    return this.domSanitizer.bypassSecurityTrustHtml(col.formatter(data[col.field], i, data));
  }

}
