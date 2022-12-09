"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WS = __importStar(require("ws"));
const database_1 = require("../database");
const config_1 = __importDefault(require("../config"));
const log = __importStar(require("../utils/log"));
const lodash_1 = __importDefault(require("lodash"));
const createWSConnection = async () => {
    try {
        const ws = new WS.WebSocket('wss://phish.sinking.yachts/feed', { headers: { 'X-Identity': config_1.default.identity } });
        ws.on('open', () => log.info('Connected to phish.sinking.yachts websocket server!'));
        ws.on('message', async (data) => {
            data = JSON.parse(data.toString());
            const domains = JSON.parse(await (0, database_1.get)(`domains:sinking-yachts`));
            if (data.type === 'add')
                await (0, database_1.set)('domains:sinking-yachts', JSON.stringify(lodash_1.default.uniq(lodash_1.default.merge(domains, data.domains))));
            else
                await (0, database_1.set)('domains:sinking-yachts', JSON.stringify(lodash_1.default.uniq(lodash_1.default.difference(domains, data.domains))));
            log.info(`${data.type} ${data.domains.join(', ')} to sinking-yachts`);
        });
        setTimeout(() => {
            ws.terminate();
            createWSConnection();
        }, 3600000);
    }
    catch (err) {
        log.error('Error! sinking-yachts websocket', err);
    }
};
exports.default = createWSConnection;
//# sourceMappingURL=sinking-yatcht.js.map