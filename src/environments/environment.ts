// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false, // 是否是发布版本
  deployPath: '.', // 部署路径
  // apiPath: 'http://localhost/sf-webapp', // 请求路径
  apiPath: 'http://10.12.117.16:8080/sf-webapp', // 请求路径 本地调试
  apiPathChangeable: false, // 请求路径是否可以更改
  isStatic: false, // 是否是静态环境
  allowCORS: true, // 是否允许跨域时带cookie参数
  defaultLng: 'zh', // 默认语言
};
