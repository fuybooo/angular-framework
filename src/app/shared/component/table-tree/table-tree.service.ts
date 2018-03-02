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
  lastNodeKey = 'isLastNode';
  params: any = {};
  columns: Column[] = [];
  syncData = [];
  sourceData = [];
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
        if (res.code === 200) {
          this.sourceData = res.data.result;
          this.getExpandDataCache(this.sourceData);
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
  private getExpandDataCache(array) {
    this.data = this.convertListToTree(array);
    array.forEach(item => {
      this.expandDataCache[item[this.key]] = this.convertTreeToList(item);
    });
  }
  refreshStatus($event, item) {
    // 改变原始数组,再生成expandDataCache
    // 思路: 找到data中对应的item元素,再找到item的所有子元素,再找到所有子元素的子元素...,将找到的元素全部设置如下:isChecked = true expand = true
    // console.log('得到的子元素:', this.getChildren(item, this.sourceData));
    // console.log('得到的子元素2:', this.getFlatChildren(item, this.sourceData));
    const current = this.sourceData.find(value => item[this.key] === value[this.key]);
    current.isChecked = $event;
    current.indeterminate = false;
    // this.changeItemStatus(current, this.sourceData);
    if ($event && !current[this.lastNodeKey]) {
      current.expand = true;
    }
    this.getFlatChildren(item, this.sourceData).forEach(value => {
      if ($event && !value[this.lastNodeKey]) {
        value.expand = true;
      }
      if (!value[this.lastNodeKey]) {
        value.indeterminate = false;
      }
      value.isChecked = $event;
    });
    console.log('所有的父元素', this.findAllParent(this.sourceData, item))
    this.findAllParent(this.sourceData, item).forEach(value => {
      this.changeItemStatus(value, this.sourceData);
    });
    this.getExpandDataCache(this.sourceData);
  }
  private changeItemStatus(value, array) {
    const children = this.getFlatChildren(value, array);
    const isAllChecked = children.every(data => {
      if (data[this.lastNodeKey]) {
        return data.isChecked;
      } else {
        return true;
      }
    });
    const isAllNotChecked = children.every(data => {
      if (data[this.lastNodeKey]) {
        return !data.isChecked;
      } else {
        return true;
      }
    });
    if (isAllChecked) {
      value.isChecked = true;
    }
    if (isAllNotChecked) {
      value.isChecked = false;
    }
    if (!isAllNotChecked && !isAllChecked) {
      value.isChecked = false;
      value.indeterminate = true;
    } else {
      value.indeterminate = false;
    }
  }
  private findAllParent(array, item, _array = []): any[] {
    const parent = array.find(value => value[this.key] === item[this.parentKey]);
    if (parent) {
      _array.unshift(parent);
      return this.findAllParent(array, parent, _array);
    } else {
      return _array;
    }
  }

  /**
   * 获取子元素
   * @param item 参照节点
   * @param sourceData 原始数据
   * @param {boolean} isDirectly 是否只获取直接的子元素 默认值为false
   * @returns {any[]}
   */
  private getFlatChildren(item, sourceData, isDirectly = false) {
    let children = [];
    for (const data of sourceData) {
      if (data[this.parentKey] === item[this.key]) {
        children.push(data);
        if (!isDirectly) {
          children = children.concat(this.getChildren(data, sourceData));
        }
      }
    }
    return children;
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
  private getChildren(item, array): any[] {
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
  private convertTreeToList(root): any[] {
    const stack = [], array = [], hashMap = {};
    stack.push({...root, level: 0, expand: !!root.expand});
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
  private visitNode(node, hashMap, array): void {
    if (!hashMap[node[this.key]]) {
      hashMap[node[this.key]] = true;
      array.push(node);
    }
  }

}
