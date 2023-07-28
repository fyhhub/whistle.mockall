import Router from 'koa-router';

const PLUGIN_NAME = 'whistle.mockall'
// For help see https://github.com/ZijianHe/koa-router#api-reference
export default (router: Router) => {
  router.post('/cgi-bin/mock/set', (ctx: any) => {
    const { localStorage } = ctx.req;
    const { url, resHeaders, resBody, reqHeaders, reqBody } = ctx.request.body;

    let mockData = localStorage.getProperty(PLUGIN_NAME);
    mockData = mockData || '{}';
    mockData = JSON.parse(mockData);
    mockData[url] = mockData[url] || {}
    console.log("%c Line:13 🥟 mockData", "color:#33a5ff", mockData);
    mockData[url].resHeaders = resHeaders === 'empty' ? undefined : resHeaders;
    mockData[url].resBody = resBody === 'empty' ? undefined : resBody;
    mockData[url].reqHeaders = reqHeaders === 'empty' ? undefined : reqHeaders;
    mockData[url].reqBody = reqBody === 'empty' ? undefined : reqBody;
    localStorage.setProperty(PLUGIN_NAME, JSON.stringify(mockData));
    ctx.body = {
      code: 200,
      message: '操作成功',
      success: true
    };
  });

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

  router.post('/cgi-bin/mock/delete', (ctx: any) => {
    const { localStorage } = ctx.req;
    const { url } = ctx.request.body;

    let mockData = localStorage.getProperty(PLUGIN_NAME);
    mockData = mockData || '{}';
    mockData = JSON.parse(mockData);
    if (mockData[url]) {
      delete mockData[url];
    }
    localStorage.setProperty(PLUGIN_NAME, JSON.stringify(mockData));
    ctx.body = {
      code: 200,
      message: '操作成功',
      success: true
    };
  });
};
