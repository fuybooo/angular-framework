import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TableComponent } from './component/table/table.component';

@NgModule({
  imports: [
    // 官方模块
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // 第三方模块
    NgZorroAntdModule,
    TranslateModule,
    // 本地模TableComponent块
  ],
  declarations: [
    TableComponent
  ],
  exports: [
    // 官方模块
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // 第三方模块
    NgZorroAntdModule,
    TranslateModule,
    // 本地模块
    TableComponent,
  ]
})
export class SharedModule { }
