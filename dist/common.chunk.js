webpackJsonp(["common"],{

/***/ "../../../../../src/app/shared/component/table/table.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TableService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_data_service__ = __webpack_require__("../../../../../src/app/core/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");




var TableService = /*@__PURE__*/ (function () {
    function TableService(http, dataService, domSanitizer) {
        this.http = http;
        this.dataService = dataService;
        this.domSanitizer = domSanitizer;
        this.allChecked = false;
        this.displayData = [];
        this.indeterminate = false;
        this.dataSet = [];
        this.loading = false;
        this.total = 1;
        this.current = 1;
        this.pageSize = 10;
        this.sortMap = {};
        this.params = {
            pageSize: 10,
            pageNumber: 1,
            sortField: '',
            sortOrder: ''
        };
        this.columns = [];
        this.syncData = [];
        this.isCheckbox = true;
        this.tableSize = 'middle';
    }
    TableService.prototype.initTable = function (props) {
        for (var i in props) {
            if (props.hasOwnProperty(i)) {
                if (i === 'params') {
                    Object.assign(this.params, props[i]);
                }
                else {
                    this[i] = props[i];
                }
            }
        }
        for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
            var col = _a[_i];
            if (col.field) {
                this.sortMap[col.field] = null;
            }
        }
        if (!this.syncData.length) {
            this.search(true);
        }
    };
    TableService.prototype.displayDataChange = function ($event) {
        this.displayData = $event;
    };
    TableService.prototype.refreshStatus = function () {
        // 判断是否每一项都被选中
        var allChecked = this.displayData.every(function (value) { return value.checked === true; });
        // 判断是否每一项都未被选中
        var allUnChecked = this.displayData.every(function (value) { return !value.checked; });
        this.allChecked = allChecked;
        // 非全选且非全不选,即有部分项被选中
        this.indeterminate = (!allChecked) && (!allUnChecked);
    };
    TableService.prototype.checkAll = function (value) {
        if (value) {
            // 将每一项设为选中
            this.displayData.forEach(function (data) { return data.checked = true; });
        }
        else {
            // 将每一项设为不选中
            this.displayData.forEach(function (data) { return data.checked = false; });
        }
        this.refreshStatus();
    };
    TableService.prototype.search = function (reset) {
        var _this = this;
        if (reset === void 0) {
            reset = false;
        }
        if (reset) {
            this.current = 1;
        }
        this.loading = true;
        if (!this.syncData.length) {
            this.params.pageNumber = this.current;
            this.params.pageSize = this.pageSize;
        }
        this.http.get(this.dataService.urls[this.url], this.dataService.getWholeParams(this.params)).subscribe(function (res) {
            _this.loading = false;
            if (res.code === '200') {
                // 远程环境中
                _this.displayData = _this.dataSet = res.data.result;
                _this.total = res.data.total;
            }
        });
    };
    TableService.prototype.sort = function (field, value) {
        this.sortMap[field] = value;
        // 本地数据
        if (this.syncData.length) {
            this.syncData = this.syncData.sort(function (a, b) {
                if (a[field] > b[field]) {
                    return (value === 'ascend') ? 1 : -1;
                }
                else if (a[field] < b[field]) {
                    return (value === 'ascend') ? -1 : 1;
                }
                else {
                    return 0;
                }
            }).slice();
        }
        else {
            // 远程数据
            this.params.sortField = field;
            this.params.sortOrder = value;
            this.search(true);
        }
    };
    TableService.prototype.getSecurityHtml = function (col, i, data) {
        return this.domSanitizer.bypassSecurityTrustHtml(col.formatter(data[col.field], i, data));
    };
    return TableService;
}());



/***/ }),

/***/ "../../../../../src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");

var SharedModule = /*@__PURE__*/ (function () {
    function SharedModule() {
    }
    return SharedModule;
}());



/***/ })

});