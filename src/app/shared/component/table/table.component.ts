import {Component, Input, OnInit} from '@angular/core';
import {Column} from './table.model';
import {TableService} from './table.service';

/**
 * app-table组件
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [TableService]
})
export class TableComponent implements OnInit {
  @Input() url;
  @Input() params: any = {};
  @Input() columns: Column[] = [];
  @Input() syncData = [];
  @Input() isCheckbox = true;
  @Input() tableSize = 'middle';
  constructor(
    public tableService: TableService
  ) {}

  ngOnInit() {
    this.tableService.initTable({
      url: this.url,
      params: this.params,
      columns: this.columns,
      syncData: this.syncData,
      isCheckbox: this.isCheckbox,
      tableSize: this.tableSize,
    });
  }

}
