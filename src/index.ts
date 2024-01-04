import {
  createHtmlResponse,
  createRedirectResponse,
  createUrl,
  matchSubDomainByRequest,
} from "./utils";
import iframeHtml from "./html/iframeHtml";
import {DOMAIN, PORT, SUBDOMAIN_WHITE_LIST} from "./constant";
import overviewHtml from "./html/overviewHtml";

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler deploy src/index.ts --name my-worker` to deploy your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
  //
  // Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
  // MY_SERVICE: Fetcher;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {

    const requestUrl = new URL(request.url);
    const {pathname, search, host, port} = requestUrl;

    const subDomain = matchSubDomainByRequest(request);
    const url = createUrl({subDomain});

    // If the url is www.alphal.cn/service
    // the sub-service of the second-level domain name is matched according to the first segment of pathname.
    if (request.url.match(RegExp(`^https?:\/\/www.${DOMAIN}.*`))) {
      if (SUBDOMAIN_WHITE_LIST.includes(subDomain)) return createRedirectResponse(url);
      return createHtmlResponse(overviewHtml);
    }

    // If the url is iframe.alphal.cn/service
    // the sub-service of the second-level domain name is matched according to the first segment of pathname.
    if (request.url.match(RegExp(`^https?:\/\/iframe.${DOMAIN}.*`))) {
      if (SUBDOMAIN_WHITE_LIST.includes(subDomain)) {
        const html = iframeHtml({url, subDomain});
        return createHtmlResponse(html);
      }
      return createHtmlResponse(overviewHtml);
    }

    // Match http://alphal.cn/xxx https://alphal.cn/xxx
    if ((request.url.match(RegExp(`^https?:\/\/${DOMAIN}.*`)) || request.url.match(/127\.0\.0\.1/)) && !subDomain) {
      return createHtmlResponse(overviewHtml);
    }

    return createHtmlResponse(overviewHtml);
  },
};
