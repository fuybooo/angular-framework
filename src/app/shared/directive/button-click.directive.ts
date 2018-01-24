import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Directive({selector: '[appButtonClick]'})
export class ButtonClickDirective {
  @Input() disableTime = 2000;
  @HostListener('click') onClick() {
    this.elementRef.nativeElement.disabled = true;
    setTimeout(() => {
      this.elementRef.nativeElement.disabled = false;
    }, this.disableTime);
  }
  constructor(private translateService: TranslateService, private elementRef: ElementRef) {}
}
