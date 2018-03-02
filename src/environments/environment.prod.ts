/**
 * 正式环境 目前是部署到 github上的主页时使用 npm run build使用
 */
export const environment = {
  production: true,
  deployPath: 'angular-framework',
  apiPath: 'http://210.12.202.144:8090/sf-webapp/api',
  apiPathChangeable: false,
  isStatic: false,
  allowCORS: true,
  defaultLng: 'zh',
};
