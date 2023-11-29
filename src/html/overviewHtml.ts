import {SUBDOMAIN_WHITE_LIST} from "../constant";
import {createUrl} from "../utils";

const createSudServices = (domainList: Array<string>) => {
  return domainList.map((subDomain: string) => {
    const url = createUrl({subDomain});
    return `<div class="sub-domain">
      <a href="${url}" target="_self">${subDomain}</a>
    </div>`;
  }).toString().replace(/,/g, "");
};

const overviewHtml = `
<!DOCTYPE html>
<html lang="en">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  root,
  html,
  body {
    height: 100%;
    width: 100%;
  }
  body {
    position: relative;
  }
  @media screen and (min-width:1000px) {
    #root {
      width: calc(100% - 40%);
      height: 70%;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: flex-start;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }
    #root .title {
      text-align: center;
      line-height: 100px;
      height: 100px;
      width: 100%;
    }
    #root .content {
      padding: 0 12px 12px 24px;
      overflow: hidden auto;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
    }
    #root .content .sub-domain {
      padding: 16px 32px;
      cursor: pointer;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }
    #root .content .sub-domain:not(:last-child) {
      margin: 0 12px 12px 0;
    }
  }
  @media screen and (max-width:1000px) {
    #root {
      flex-flow: column nowrap;
    }
    #root .title {
      text-align: center;
      font-size: 24px;
      line-height: 100px;
      height: 100px;
    }
    #root .content {
      overflow: hidden auto;
      height: calc(100% - 100px);
      padding: 0 24px 48px 24px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: flex-start;
    }
    #root .content .sub-domain {
      overflow: hidden auto;
      width: 100%;
      text-align: center;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }
    #root .content .sub-domain a {
      padding: 12px 0;
      display: block;
    }
    #root .content .sub-domain:not(:last-child) {
      margin-bottom: 12px;
    }
  }
  a {
    text-decoration: none;
    color: #333;
  }
</style>
<head>
  <meta charset="UTF-8">
  <title>Overview</title>
</head>
<body>

<div id="root">
  <h3 class="title">Subservice List</h3>
  <div class="content">
    ${createSudServices(SUBDOMAIN_WHITE_LIST)}
  </div>
</div>

</body>
</html>
`;

export default overviewHtml;
