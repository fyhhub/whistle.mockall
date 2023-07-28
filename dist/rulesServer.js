"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const PLUGIN_NAME = 'whistle.mockall';
exports.default = (server, options) => {
    const app = new koa_1.default();
    const storage = options.storage;
    app.use((ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const { req } = ctx;
        const { originalReq } = req;
        const fullUrl = originalReq.fullUrl;
        const rules = [];
        const values = {};
        let mockData = storage.getProperty(PLUGIN_NAME);
        if (mockData) {
            mockData = JSON.parse(mockData);
            if (mockData[fullUrl]) {
                const resHeaders = mockData[fullUrl].resHeaders;
                const resBody = mockData[fullUrl].resBody;
                const reqBody = mockData[fullUrl].reqBody;
                const reqHeaders = mockData[fullUrl].reqHeaders;
                if (resHeaders) {
                    const key = fullUrl + '_resHeaders';
                    rules.push(`${fullUrl} resHeaders://{${key}}`);
                    values[key] = resHeaders;
                }
                if (resBody) {
                    const key = fullUrl + '_resBody';
                    rules.push(`${fullUrl} resBody://{${key}}`);
                    values[key] = resBody;
                }
                if (reqBody) {
                    const key = fullUrl + '_reqBody';
                    rules.push(`${fullUrl} reqBody://{${key}}`);
                    values[key] = reqBody;
                }
                if (reqHeaders) {
                    const key = fullUrl + '_reqHeaders';
                    rules.push(`${fullUrl} reqHeaders://{${key}}`);
                    values[key] = reqHeaders;
                }
            }
            ctx.body = {
                rules: `${rules}`,
                values,
            };
        }
    }));
    server.on('request', app.callback());
};
