import { WhistleUiServer } from 'whistle-plugin-devtool'
import path from 'path'

const PLUGIN_NAME = 'whistle.mockall'

export default (server: Whistle.PluginServer, options: Whistle.PluginOptions) => {
  const uiServer = new WhistleUiServer(server, options);

  uiServer
    .config({
      publicPath: path.resolve(__dirname, '../../public')
    })
    .post('/cgi-bin/mock/set', ({ storage, body }) => {
      const { url, mockKey, mockData } = body || {};
      let allMock = storage.get(PLUGIN_NAME) || {};
      allMock[url] = allMock[url] || {}
      storage.set(PLUGIN_NAME, allMock);
      if (mockData) {
        storage.set(PLUGIN_NAME, mockData === 'empty' ? undefined : mockData, [url, mockKey])
      }
      return {
        code: 200,
        message: '操作成功',
        success: true
      };
    })
    .post('/cgi-bin/mock/delete', ({ storage, body }) => {
      const { url } = body || {};
      let mockData = storage.get(PLUGIN_NAME) || {};
      if (mockData[url]) {
        delete mockData[url];
      }
      storage.set(PLUGIN_NAME, mockData, '')
      return {
        code: 200,
        message: '操作成功',
        success: true
      };
    })
    .get('/cgi-bin/mock/get', ({ storage }) => {
      return {
        code: 200,
        message: '操作成功',
        data: storage.get(PLUGIN_NAME),
        success: true
      };
    })
};
