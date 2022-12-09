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
const undici_1 = require("undici");
const database_1 = require("../database");
const config_1 = __importDefault(require("../config"));
const log = __importStar(require("../utils/log"));
const requestPool = new undici_1.Pool('https://phish.sinking.yachts/');
exports.default = async () => {
    try {
        const blacklist = await requestPool
            .request({
            method: 'GET',
            path: process.uptime() < 30000 ? '/v2/all' : '/v2/recent/1200',
            headers: { 'X-Identity': config_1.default.identity },
        })
            .then(res => res.body.json());
        await (0, database_1.set)('domains:sinking-yachts', JSON.stringify(blacklist));
        log.info('Updated sinking-yachts');
    }
    catch (err) {
        log.error('Error! sinking-yachts', err);
    }
};
//# sourceMappingURL=sinking-yachts.js.map