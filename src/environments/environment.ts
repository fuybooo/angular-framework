// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  deployPath: '.',
  apiPath: 'http://210.12.202.144:8090/sf-webapp/api',
  // apiPath: '/proxy', // 使用代理
  apiPathChangeable: false,
  isStatic: false,
  allowCORS: true,
  defaultLng: 'zh',
};
