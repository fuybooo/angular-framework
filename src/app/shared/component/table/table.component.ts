import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../core/data.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() url;
  @Input() params = {};
  @Input() columns;
  _allChecked = false;
  _checkedNumber = 0;
  _displayData: Array<any> = [];
  _dataSet = [];
  _indeterminate = false;
  constructor(
    private dataService: DataService,
    private http: HttpClient
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
    // 被选中的条数
    this._checkedNumber = this._dataSet.filter(value => value.checked).length;
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
    this.http.get(this.dataService.urls[this.url], this.dataService.getWholeParams(this.params)).subscribe((res: any) => {
      if (res.code === '200') {
        // 判断是否为分页

      }
    });
  }

}
