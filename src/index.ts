import {
  createHtmlResponse,
  createRedirectResponse,
  createUrl,
  matchSubDomainByRequest,
} from "./utils";
import subDomainHtml from "./html/subDomainHtml";
import {SUBDOMAIN_WHITE_LIST} from "./constant";
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

    // const requestUrl = new URL(request.url);
    // const {pathname, search, host} = requestUrl;

    const subDomain = matchSubDomainByRequest(request);
    const url = createUrl({subDomain});

    // If the url is www.alphal.cn,
    // the sub-service of the second-level domain name is matched according to the first segment of pathname.
    if (request.url.match(/^https?:\/\/www.alphal.cn.*/) && SUBDOMAIN_WHITE_LIST.includes(subDomain)) {
      return createRedirectResponse(url);
    }

    // Match http://alphal.cn/xxx https://alphal.cn/xxx
    if ((request.url.match(/^https?:\/\/alphal.cn.*/) || request.url.match(/127\.0\.0\.1/)) && !subDomain) {
      return createHtmlResponse(overviewHtml);
    }

    // Use iframe nesting to return sub-services of second-level domain names
    const html = subDomainHtml({url, subDomain});
    return createHtmlResponse(html);
  },
};
