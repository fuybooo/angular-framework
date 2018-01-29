import { Injectable } from '@angular/core';
import {Column} from '../table/table.model';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../../core/data.service';
import {DomSanitizer} from '@angular/platform-browser';

/**
 * 不支持分页查询
 */
@Injectable()
export class TableTreeService {
  loading = false;
  url;
  key = 'id';
  parentKey = 'parentId';
  field = 'name';
  params: any = {};
  columns: Column[] = [];
  syncData = [];
  data = [];
  expandDataCache = [];
  isCheckbox = true;
  tableSize = 'middle';
  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private domSanitizer: DomSanitizer) { }
  initTable(props) {
    for (const i in props) {
      if (props.hasOwnProperty(i)) {
        this[i] = props[i];
      }
    }
    if (!this.syncData.length) {
      this.search();
    }
  }
  search() {
    this.loading = true;
    if (this.url) {
      this.http.get(this.dataService.urls[this.url], this.dataService.getWholeParams(this.params)).subscribe((res: any) => {
        this.loading = false;
        if (res.code === '200') {
          this.data = this.convertListToTree(res.data.result);
          this.data.forEach(item => {
            this.expandDataCache[item[this.key]] = this.convertTreeToList(item);
          });
        }
      });
    }
  }
  collapse(array, data, $event) {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a[this.key] === d[this.key]);
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }
  refreshStatus($event) {

  }
  private convertListToTree(sourceData: any[]) {
    const list = [];
    for (const item of sourceData) {
      if (this.isRoot(item, sourceData)) {
        const children = this.getChildren(item, sourceData);
        if (children.length > 0) {
          item.children = children;
        }
        list.push(item);
      }
    }
    return list;
  }
  private isRoot(item, array): boolean {
    if (item[this.parentKey]) {
      for (const data of array) {
        if (data[this.key] === item[this.parentKey]) {
          return false; // 此节点存在父节点，故不是根节点
        }
      }
    }
    return true;
  }
  private getChildren(item, array) {
    const children = [];
    for (const data of array) {
      if (item[this.key] === data[this.parentKey]) {
        const _children = this.getChildren(data, array);
        if (_children.length > 0) {
          data.children = _children;
        }
        children.push(data);
      }
    }
    return children;
  }
  private convertTreeToList(root) {
    const stack = [], array = [], hashMap = {};
    stack.push({...root, level: 0, expand: false});
    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({...node.children[i], level: node.level + 1, expand: !!node.children[i].expand, parent: node});
        }
      }
    }
    return array;
  }
  private visitNode(node, hashMap, array) {
    if (!hashMap[node[this.key]]) {
      hashMap[node[this.key]] = true;
      array.push(node);
    }
  }

}
