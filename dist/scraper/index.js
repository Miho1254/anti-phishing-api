"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_hashes_1 = __importDefault(require("./discord-hashes"));
const discord_phishing_backend_1 = __importDefault(require("./discord-phishing-backend"));
const discord_phishing_links_1 = __importDefault(require("./discord-phishing-links"));
const discord_scam_links_1 = __importDefault(require("./discord-scam-links"));
const hyperphish_1 = __importDefault(require("./hyperphish"));
const sinking_yachts_1 = __importDefault(require("./sinking-yachts"));
const sinking_yatcht_1 = __importDefault(require("../websocket/sinking-yatcht"));
const executeScraper = async () => {
    return await Promise.all([
        (0, discord_hashes_1.default)(),
        (0, discord_phishing_backend_1.default)(),
        (0, discord_phishing_links_1.default)(),
        (0, discord_scam_links_1.default)(),
        (0, hyperphish_1.default)(),
        (0, sinking_yachts_1.default)(),
        (0, sinking_yatcht_1.default)(),
    ]);
};
exports.default = executeScraper;
//# sourceMappingURL=index.js.map