"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PLUGIN_NAME = 'whistle.mockall';
exports.default = (router) => {
    router.post('/cgi-bin/mock/set', (ctx) => {
        const { localStorage } = ctx.req;
        const { url, mockKey, mockData } = ctx.request.body;
        let allMock = localStorage.getProperty(PLUGIN_NAME);
        allMock = allMock || '{}';
        allMock = JSON.parse(allMock);
        allMock[url] = allMock[url] || {};
        if (mockData) {
            allMock[url][mockKey] = mockData === 'empty' ? undefined : mockData;
        }
        localStorage.setProperty(PLUGIN_NAME, JSON.stringify(allMock));
        ctx.body = {
            code: 200,
            message: '操作成功',
            success: true
        };
    });
    router.get('/cgi-bin/mock/get', (ctx) => {
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
    router.post('/cgi-bin/mock/delete', (ctx) => {
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
