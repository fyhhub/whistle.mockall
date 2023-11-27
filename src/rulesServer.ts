import Koa from 'koa';
import url from 'url';
const PLUGIN_NAME = 'whistle.mockall'

export default (server: Whistle.PluginServer, options: Whistle.PluginOptions) => {
  const app = new Koa();
  const storage = options.storage;
  app.use(async (ctx) => {
    const { req } = ctx as any;
    const { originalReq } = req;
    const parsed = url.parse(originalReq.fullUrl)
    const fullUrl = `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
    const rules = [];
    const values: Record<string, string> = {};

    let mockData = storage.getProperty(PLUGIN_NAME);
    if (mockData) {
      mockData = JSON.parse(mockData)
      if (mockData[fullUrl]) {
        const {
          resHeaders,
          resBody,
          reqBody,
          reqHeaders,
          statusCode,
          resDelay,
        } = mockData[fullUrl];
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
        if (resDelay) {
          const key = fullUrl + '_resDelay'
          rules.push(`${fullUrl} resDelay://{${key}}`)
          values[key] = resDelay;
        }
        // TODO change
      }
      if (mockData['global']) {
        const { sourcemapMapping } = mockData['global'] || {};
        if (sourcemapMapping) {
          try {
            const sourcemapJson = JSON.parse(sourcemapMapping);
            const filename = Object.keys(sourcemapJson).find(key => fullUrl.includes(key))
            const key = filename + '_sourcemapMapping'
            if (filename) {
              rules.push(`${fullUrl} jsAppend://{${key}}`)
              values[key] = `//# sourceMappingURL=${sourcemapJson[filename]}`
            }
          } catch(e) {
            console.log(e);
          }
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
