import {Component, Input, OnInit} from '@angular/core';
import {Column} from '../table/table.model';
import {TableTreeService} from './table-tree.service';

@Component({
  selector: 'app-table-tree',
  templateUrl: './table-tree.component.html',
  styleUrls: ['./table-tree.component.scss'],
  providers: [TableTreeService]
})
export class TableTreeComponent implements OnInit {
  @Input() url;
  @Input() params: any = {};
  @Input() columns: Column[] = [];
  @Input() syncData = [];
  @Input() isCheckbox = true;
  @Input() tableSize = 'middle';
  constructor(
    public tableTreeService: TableTreeService
  ) { }

  ngOnInit() {
    this.tableTreeService.initTable({
      url: this.url,
      params: this.params,
      columns: this.columns,
      syncData: this.syncData,
      isCheckbox: this.isCheckbox,
      tableSize: this.tableSize,
    });
  }

}
