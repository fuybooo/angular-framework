import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../core/data.service';
import {HttpClient} from '@angular/common/http';
import {Column} from '../../shared.model';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() url;
  @Input() params: any = {};
  @Input() columns: Column[] = [];
  @Input() syncData = [];
  @Input() isCheckbox = true;
  @Input() tableSize = 'middle';
  _allChecked = false;
  _displayData: Array<any> = [];
  _indeterminate = false;
  _dataSet = [];
  _loading = false;
  _total = 1;
  _current = 1;
  _pageSize = 10;
  _sortField = '';
  _sortValue = '';
  _sortMap = {};
  constructor(
    private dataService: DataService,
    private http: HttpClient,
    public domSanitizer: DomSanitizer
  ) {}

  /**
   * 获取当前页的数据
   * @param $event
   * @private
   */
  _displayDataChange($event) {
    this._displayData = $event;
  }

  _refreshStatus() {
    // 判断是否每一项都被选中
    const allChecked = this._displayData.every(value => value.checked === true);
    // 判断是否每一项都未被选中
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    // 非全选且非全不选,即有部分项被选中
    this._indeterminate = (!allChecked) && (!allUnChecked);
  }

  _checkAll(value) {
    if (value) {
      // 将每一项设为选中
      this._displayData.forEach(data => data.checked = true);
    } else {
      // 将每一项设为不选中
      this._displayData.forEach(data => data.checked = false);
    }
    this._refreshStatus();
  }

  ngOnInit() {
    for (const col of this.columns) {
      if (col.field) {
        this._sortMap[col.field] = null;
      }
    }
    if (!this.syncData.length) {
      if (!this.params.pageNumber) {
        this.params.pageNumber = this._current;
      }
      if (!this.params.pageSize) {
        this.params.pageSize = this._pageSize;
      }
      this.search();
    } else {
    }
  }
  search(reset = false) {
    if (reset) {
      this._current = 1;
    }
    this._loading = true;
    this.http.get(this.dataService.urls[this.url], this.dataService.getWholeParams(this.params)).subscribe((res: any) => {
      this._loading = false;
      if (res.code === '200') {
        // 远程环境中
        this._displayData = this._dataSet = res.data.result;
        this._total = res.data.total;
      }
    });
  }
  sort(field, value) {
    this._sortField = field;
    this._sortValue = value;
    this._sortMap[this._sortField] = this._sortValue;
    // 本地数据
    if (this.syncData.length) {
      this.syncData = [...this.syncData.sort((a, b) => {
        if (a[this._sortField] > b[this._sortField]) {
          return (this._sortValue === 'ascend') ? 1 : -1;
        } else if (a[this._sortField] < b[this._sortField]) {
          return (this._sortValue === 'ascend') ? -1 : 1;
        } else {
          return 0;
        }
      })];
    }
    // 远程数据
  }
  onClickDel(item) {
    console.log(item);
  }
  onClickEdit(item) {
    console.log(item);
  }

}
