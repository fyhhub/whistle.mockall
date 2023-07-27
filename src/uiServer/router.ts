import Router from 'koa-router';

const PLUGIN_NAME = 'whistle.mockall'
// For help see https://github.com/ZijianHe/koa-router#api-reference
export default (router: Router) => {
  router.post('/cgi-bin/mock/set', (ctx: any) => {
    const { localStorage } = ctx.req;
    const { url, resHeaders, resBody } = ctx.request.body;

    let mockData = localStorage.getProperty(PLUGIN_NAME);
    if (mockData) {
      mockData = JSON.parse(mockData);
      mockData[url].resHeaders = resHeaders;
      mockData[url].resBody = resBody;
    } else {
      mockData = {
        [url]: {
          resHeaders,
          resBody,
        }
      }
    }
    localStorage.setProperty(PLUGIN_NAME, JSON.stringify(mockData));
    ctx.body = {
      code: 200,
      message: '操作成功',
      success: true
    };
  });

  // router.post('/cgi-bin/mock/ismock', (ctx: any) => {
  //   const { localStorage } = ctx.req;
  //   const { isMockResHeaders, url } = ctx.request.body;
  //   localStorage.setProperty(PLUGIN_NAME, JSON.stringify(mockData));
  //   ctx.body = {
  //     code: 200,
  //     message: '操作成功',
  //     success: true
  //   };
  // });

  router.get('/cgi-bin/mock/get', (ctx: any) => {
    const { localStorage } = ctx.req;
    let mockData = localStorage.getProperty(PLUGIN_NAME);
    if (mockData) {
      mockData = JSON.parse(mockData);
    }
    ctx.body = {
      code: 200,
      message: '操作成功',
      data: mockData,
      success: true
    };
  });
};
