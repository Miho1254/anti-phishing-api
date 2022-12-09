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
const config_1 = __importDefault(require("../config"));
const database_1 = require("../database");
const lodash_1 = __importDefault(require("lodash"));
const undici_1 = require("undici");
const log = __importStar(require("../utils/log"));
const uploadFile = async (content, fileName) => {
    const headers = {
        Authorization: `Bearer ${config_1.default.github.token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'undici',
    };
    const url = `https://api.github.com/repos/${config_1.default.github.repo}/contents/${fileName}`;
    const fileData = await (0, undici_1.request)(url, { headers })
        .then(el => el.body.json())
        .catch(() => null);
    const contentEncoded = Buffer.from(content).toString('base64');
    if (contentEncoded == fileData.content)
        return;
    const data = JSON.stringify({
        message: `[skip actions] Automatic update ${fileName}`,
        content: contentEncoded,
        sha: fileData ? fileData.sha : null,
    });
    try {
        await (0, undici_1.request)(url, {
            headers,
            method: 'PUT',
            body: data,
        });
        log.info(`Uploaded ${fileName} to github!`);
    }
    catch (err) {
        log.error(`Error uploading ${fileName} to github!`, err);
    }
};
exports.default = async () => {
    if (!config_1.default.github)
        return;
    const links = await (0, database_1.getAll)('links:*');
    const domains = await (0, database_1.getAll)('domains:*');
    console.log(links);
    await uploadFile(JSON.stringify(lodash_1.default.uniq(links).filter(v => v.length).sort(), null, 5), 'blacklist-links.json');
    await uploadFile(JSON.stringify(lodash_1.default.uniq(domains).filter(v => v.length).sort(), null, 5), 'blacklist-domains.json');
};
//# sourceMappingURL=github.js.map