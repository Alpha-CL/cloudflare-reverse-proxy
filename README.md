# Cloudflare reverse proxy

#### Wrangler commands

```

npx wrangler login

npx wrangler deploy

npx wrangler dev

```

#### Usages

> set config( eg: domain, port ...) on ./src/constant.ts

```

DOMAIN = 'baidu.com';           // main domain

PORT = 8080;                    // reverse proxy port  

SUBDOMAIN_WHITE_LIST = [        // subdomain white list
    'wwww',
    'openwrt',
    'chat'
];

```
