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
Object.defineProperty(exports, "__esModule", { value: true });
const undici_1 = require("undici");
const database_1 = require("../database");
const log = __importStar(require("../utils/log"));
const url = 'https://api.hyperphish.com/gimme-domains';
exports.default = async () => {
    try {
        const blacklist = await (0, undici_1.request)(url).then(res => res.body.json());
        await (0, database_1.set)('domains:hyperphish', JSON.stringify(blacklist));
        log.info('Updated hyperphish');
    }
    catch (err) {
        log.error('Error! hyperphish', err);
    }
};
//# sourceMappingURL=hyperphish.js.map