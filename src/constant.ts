export type ResponseRedirectStatus = 301 | 302 | 303 | 307 | 308;

export const PROTOCOL = 'https';

export const DOMAIN = "alphal.cn";

export const PORT = 9527;

export const STATUS_CODE: ResponseRedirectStatus = 302;

export const SUBDOMAIN_WHITE_LIST = [
  'chat',
  'jenkins',
  'easymock',
  'qinglong',
  'rocket',
  'alist',
];
