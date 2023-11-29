import {DOMAIN, PORT, PROTOCOL, STATUS_CODE} from "./constant";

export const matchSubDomainByRequest = (request: Request) => {
  let subDomain = "";
  const url = new URL(request.url);
  const {pathname} = url;
  const match = pathname.match(/^\/(.*?)(\/|$)/);
  if (match) subDomain = match[1].trim();
  if (subDomain === 'favicon.ico') return "";
  return subDomain;
};

export interface IURLConfig {
  subDomain: string;
  protocol?: string;
  domain?: string;
  port?: number;
}

export const createUrl = (urlConfig: IURLConfig) => {
  const defaultConfig = {
    protocol: PROTOCOL,
    domain: DOMAIN,
    port: PORT
  };
  const {protocol, domain, port} = Object.assign(defaultConfig, urlConfig);
  const subDomain = urlConfig.subDomain ? `${urlConfig.subDomain}.` : "";
  return `${protocol}://${subDomain}${domain}:${port}`;
};

export const createHtmlResponse = (html: string, options?: any) => {
  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
    ...options
  });
};

export const createRedirectResponse = async (url: string, statusCode = STATUS_CODE) => {
  return Response.redirect(url, statusCode);
};
