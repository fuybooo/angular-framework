## 重构/总结EMM
1. 使用ng new 生成新的项目
      1. 安装包的过程产生各种问题
      2. 解决方案: npm i @angular-devkit/core@0.0.28
2. 使项目支持sass
    .angular-cli.json 
    
    ***
        "styles": [
           - "styles.css"
           + "styles.scss"
        ],
3. 添加新的依赖包
    ***
        "@angular/platform-server": "^5.1.2",
        "@ngx-translate/core": "^9.0.1",
        "@ngx-translate/http-loader": "^2.0.0",
        "@types/jquery": "^3.2.16",
        "echarts": "^3.8.5",
        "gulp": "^3.9.1",
        "gulp-uglify": "^3.0.0",
        "intl": "^1.2.5",
        "jquery": "^3.2.1",
        "jquery-mousewheel": "^3.1.13",
        "malihu-custom-scrollbar-plugin": "^3.1.5",
        "moment": "^2.19.3",
        "ng-zorro-antd": "^0.6.10",
        "ng2-file-upload": "^1.3.0",
        "web-animations-js": "^2.3.1"
4. 必要时 升级package包 ncu -a
    1. npm i -g npm-check-updates
    2. ncu -a
    3. 重新安装依赖
5. 使用cli创建文件
    ****
        Component 	ng g component my-new-component
        Directive 	ng g directive my-new-directive
        Pipe 	ng g pipe my-new-pipe
        Service 	ng g service my-new-service
        Class 	ng g class my-new-class
        Interface 	ng g interface my-new-interface
        Enum 	ng g enum my-new-enum
        Module 	ng g module my-module
        // 例如:
        ng g module core
        ng g module shared
        ng g service core
6. 搭建路由
    ***
        路由结构
        root
          |-- login
          |     |-- resetPassword
          |     |-- findPassword
          |     |-- protocol
          |     |-- ...
          |
          |-- main
          |     |-- dashboard
          |     |-- settings
          |     |-- ...
7. 使用模块化的方式使用路由,将项目分成不同的小模块
    ***
        1. 在每个模块都引入SharedModule, HttpInterceptorService
        2. 如果该模块中的组件被其他组件需要,则导出该组件,并在其他模块引入该模块即可
