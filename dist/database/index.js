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
exports.hasHash = exports.getAll = exports.del = exports.set = exports.get = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const config_1 = __importDefault(require("../config"));
const log = __importStar(require("../utils/log"));
const lodash_1 = __importDefault(require("lodash"));
const db = new ioredis_1.default(config_1.default.redis.host, {
    password: config_1.default.redis.password,
    port: config_1.default.redis.port,
});
db.on('error', err => log.error('Redis connection error', err));
const get = async (key) => {
    if (!key)
        throw new Error('Key is required');
    return await db.get(key);
};
exports.get = get;
const set = async (key, value, time = null) => {
    if (!key)
        throw new Error('Key is required');
    if (!value)
        throw new Error('Value is required');
    if (!time)
        return await db.set(key, value);
    return await db.set(key, value, 'PX', time);
};
exports.set = set;
const del = async (key) => {
    if (!key)
        throw new Error('Key is required');
    return await db.del(key);
};
exports.del = del;
const getAll = async (pattern = '*') => {
    const keys = await db.keys(pattern);
    if (keys.length == 0)
        return [];
    const values = await db.mget(keys);
    return lodash_1.default.uniq(values.map(v => JSON.parse(v)).flat());
};
exports.getAll = getAll;
const hasHash = async (hash) => {
    if (!hash)
        return new Error('Hash is required');
    const hashes = await db.get('hashes:discord');
    return hashes.includes(hash);
};
exports.hasHash = hasHash;
//# sourceMappingURL=index.js.map