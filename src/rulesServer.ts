import Koa from 'koa';
const PLUGIN_NAME = 'whistle.mockall'

export default (server: Whistle.PluginServer, options: Whistle.PluginOptions) => {
  const app = new Koa();
  const storage = options.storage;
  app.use(async (ctx) => {
    const { req } = ctx;
    // @ts-ignore
    const { originalReq } = req;
    const fullUrl = originalReq.fullUrl;
    const rules = [];
    const values: Record<string, string> = {};

    let mockData = storage.getProperty(PLUGIN_NAME);
    if (mockData) {
      mockData = JSON.parse(mockData)

      if (mockData[fullUrl]) {
        const resHeaders = mockData[fullUrl].resHeaders;
        const resBody = mockData[fullUrl].resBody;
        const reqBody = mockData[fullUrl].reqBody;
        const reqHeaders = mockData[fullUrl].reqHeaders;
        const statusCode = mockData[fullUrl].statusCode;

        if (resHeaders) {
          const key = fullUrl + '_resHeaders'
          rules.push(`${fullUrl} resHeaders://{${key}}`)
          values[key] = resHeaders;
        }

        if (resBody) {
          const key = fullUrl + '_resBody'
          rules.push(`${fullUrl} resBody://{${key}}`)
          values[key] = resBody;
        }
        if (reqBody) {
          const key = fullUrl + '_reqBody'
          rules.push(`${fullUrl} reqBody://{${key}}`)
          values[key] = reqBody;
        }
        if (reqHeaders) {
          const key = fullUrl + '_reqHeaders'
          rules.push(`${fullUrl} reqHeaders://{${key}}`)
          values[key] = reqHeaders;
        }
        if (statusCode) {
          const key = fullUrl + '_statusCode'
          rules.push(`${fullUrl} statusCode://{${key}}`)
          values[key] = statusCode;
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
