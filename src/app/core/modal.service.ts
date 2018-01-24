import {Injectable} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';
import {TranslateService} from '@ngx-translate/core';
/**
 * 重写nzModalService
 * 重写目的：1.提供默认的国际化支持;2.简写某些常用的弹框
 * 可以根据需求重写其他类型的简化调用方法
 */
@Injectable()
export class ModalService {
  public modalCount = 2000;
  option = {
    okText: this.translateService.instant('ok'),
    cancelText: this.translateService.instant('cancel'),
    zIndex: 2802
  };
  constructor(
    private nzModalService: NzModalService,
    private translateService: TranslateService,
  ) {}
  confirmSave(okFunction: Function, cancelFunction?: Function, content?: string) {
    this.popupConfirm('confirm_save', okFunction, cancelFunction, content);
  }
  confirmCancel(okFunction: Function, cancelFunction?: Function, content?: string) {
    this.popupConfirm('confirm_cancel', okFunction, cancelFunction, content);
  }
  confirmLeave(okFunction: Function, cancelFunction?: Function, content?: string) {
    this.popupConfirm('confirm_leave', okFunction, cancelFunction, content);
  }
  confirm(options: any) {
    this.nzModalService.confirm(Object.assign(this.option, options));
  }
  confirmDelete(okFunction: Function, cancelFunction?: Function, content?: string) {
    this.popupConfirm('confirm_delete', okFunction, cancelFunction, content);
  }
  popupConfirm(title: string, okFunction: Function, cancelFunction?: Function, content?: string) {
    const options: any = {onOk: okFunction, onCancel: cancelFunction};
    if (content) {
      options.content = content;
    }
    this.nzModalService.confirm(Object.assign({
      title: this.translateService.instant(title),
    }, this.option, options));
  }
}
