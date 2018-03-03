/**
 * 服务器环境 运行npm run server会使用该环境,打包后的代码可以直接放入后台服务器,需要保证isStatic为false
 */
export const environment = {
  production: true,
  deployPath: '',
  apiPath: 'http://210.12.202.144:8090/sf-webapp/api',
  apiPathChangeable: true,
  isStatic: true,
  allowCORS: true,
  defaultLng: 'zh',
};
