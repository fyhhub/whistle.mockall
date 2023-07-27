import Koa from 'koa';
const PLUGIN_NAME = 'whistle.mockall'

export default (server: Whistle.PluginServer, options: Whistle.PluginOptions) => {
  const app = new Koa();
  const storage = options.storage;
  app.use(async (ctx) => {
    const { req } = ctx;
    // @ts-ignore
    const { originalReq } = req;
    let mockData = storage.getProperty(PLUGIN_NAME);
    const fullUrl = originalReq.fullUrl;
    const rules = [];
    const values: Record<string, string> = {};
    if (mockData) {
      mockData = JSON.parse(mockData)
      if (mockData[fullUrl]) {
        const resHeaders = mockData[fullUrl].resHeaders;
        const resBody = mockData[fullUrl].resBody;

        if (resHeaders) {
          const key = fullUrl + '_resHeaders'
          rules.push(`${fullUrl} resHeaders://{${key}}`)
          values[key] = JSON.stringify(resHeaders);
        }

        if (resBody) {
          const key = fullUrl + '_resBody'
          rules.push(`${fullUrl} resBody://{${key}}`)
          values[key] = JSON.stringify(resBody);
        }
      }
      ctx.body = {
        rules: `${rules}`,
        values,
      }
    }
    // 获取请求完整url, req是koa的请求对象
  })

  server.on('request', app.callback());
};
