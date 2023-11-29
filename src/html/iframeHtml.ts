export interface IVariables {
  url: string;
  subDomain: string;
}

export const iframeHtml = (variables: IVariables) => {

  const {
    url = '',
    subDomain = ''
  } = variables;

  return `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <title>${subDomain}</title>
      <style type="text/css">
        html,
        body {
          padding: 0;
          margin: 0;
          overflow: hidden;
        }
        #root {
          position: relative;
          overflow: hidden;
          width: 100vw;
          height: 100vh;
        }
        #root iframe {
          display: block;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }
        ::-webkit-scrollbar {
          display: none;
        }
      </style>
    </head>
    <body>
    
    <div id="root">
      <iframe src="${url}" frameborder="no"  border="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
    </div>
    
    </body>
    </html>
  `;
};

export default iframeHtml;
