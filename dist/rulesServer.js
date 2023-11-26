"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whistle_plugin_devtool_1 = require("whistle-plugin-devtool");
const PLUGIN_NAME = 'whistle.mockall';
exports.default = (server, options) => {
    const rulesServer = new whistle_plugin_devtool_1.WhistleRulesServer(server, options);
};
