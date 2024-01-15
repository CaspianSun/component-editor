export enum Page {
  /** 自定义页面 */
  Custom = 'custom',
  /** 登陆 */
  Login = 'login',
}

export const pageNameMap: {
  [key in Page]: string
} = {
  [Page.Custom]: '自定义页面',
  [Page.Login]: '登陆',
}
