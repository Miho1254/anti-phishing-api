"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../database");
const lodash_1 = __importDefault(require("lodash"));
const parse_domain_1 = require("parse-domain");
const crypto_1 = require("crypto");
const jaro_winkler_1 = __importDefault(require("jaro-winkler"));
const testList = ['steam', 'discord', 'steamcommunity'];
const undici_1 = require("undici");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    async getAllLinksAndDomain() {
        const links = await (0, database_1.getAll)('links:*');
        const domains = await (0, database_1.getAll)('domains:*');
        return lodash_1.default.uniq(lodash_1.default.merge(links, domains));
    }
    async getAllLinks() {
        return await (0, database_1.getAll)('links:*');
    }
    async getAllDomains() {
        return await (0, database_1.getAll)('domains:*');
    }
    async addDomain(url) {
        const urlParsed = (0, parse_domain_1.parseDomain)((0, parse_domain_1.fromUrl)(url));
        if (urlParsed.type === 'LISTED')
            url = urlParsed.domain + '.' + urlParsed.topLevelDomains.join('.');
        const customData = JSON.parse(await (0, database_1.get)('domains:custom')) || [];
        const newData = lodash_1.default.uniq([...customData, url]);
        if (newData.length == customData.length)
            throw new common_1.BadRequestException('Domain already exists!');
        await (0, database_1.set)(`domains:custom`, JSON.stringify(newData));
        return { message: 'Domain added!', url };
    }
    async addLink(url) {
        const urlParsed = (0, parse_domain_1.parseDomain)((0, parse_domain_1.fromUrl)(url));
        if (urlParsed.type !== 'LISTED')
            throw new common_1.BadRequestException('URL is not a valid domain!');
        const customData = JSON.parse(await (0, database_1.get)('links:custom')) || [];
        const newData = lodash_1.default.uniq([...customData, url]);
        if (newData.length == customData.length)
            throw new common_1.BadRequestException('Domain already exists!');
        await (0, database_1.set)(`links:custom`, JSON.stringify(newData));
        return { message: 'Domain added!', url };
    }
    async check(url) {
        const urlParsed = (0, parse_domain_1.parseDomain)((0, parse_domain_1.fromUrl)(url));
        if (urlParsed.type === 'LISTED')
            url = urlParsed.domain + '.' + urlParsed.topLevelDomains.join('.');
        const hash = (0, crypto_1.createHash)('sha256').update(url).digest('hex');
        if (await (0, database_1.hasHash)(hash))
            return { blacklist: true, domain: url, type: 'discord-hash' };
        const blacklistDomains = await (0, database_1.getAll)('domains:*');
        const blacklistLinks = await (0, database_1.getAll)('links:*');
        const domainCheck = filterAndReturn(url, blacklistDomains);
        if (domainCheck.blacklist)
            return { blacklist: true, domain: url, type: 'domains' };
        const linkCheck = filterLinks(url, blacklistLinks);
        if (linkCheck.blacklist)
            return { blacklist: true, domain: url, type: 'links' };
        else
            return { blacklist: false, domain: url };
    }
    async rapidreport(url, message = 'N/A') {
        const urlParsed = (0, parse_domain_1.parseDomain)((0, parse_domain_1.fromUrl)(url));
        let domain;
        if (urlParsed.type === 'LISTED')
            domain = urlParsed.domain + '.' + urlParsed.topLevelDomains.join('.');
        const domainCheck = testList.map(name => ({ name, score: (0, jaro_winkler_1.default)(name, domain) })).sort((a, b) => b.score - a.score)[0];
        if (domainCheck.score > 0.7) {
            console.log(`${domainCheck.name} - ${domainCheck.score}`);
            await (0, undici_1.request)(`${process.env.REPORT_URL}/report`, {
                method: 'POST',
                headers: {
                    authorization: process.env.REPORT_TOKEN,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    url: url,
                    content: message || `${domainCheck.name} is linked to ${url}`,
                    userID: '00000000000',
                    userTag: 'Rapid Report#0000',
                }),
            });
        }
        return 'Rapid Report sent!';
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
const filterDomains = (url, urlToCheck) => url == urlToCheck;
function filterAndReturn(url, list) {
    const filtered = list.filter(item => filterDomains(item, url));
    if (filtered.length !== 0)
        return { url, blacklist: true, data: filtered[0] };
    else
        return { url, blacklist: false };
}
function filterLinks(url, list) {
    let blacklist = false;
    for (let i = 0; i < list.length; i++)
        if (list[i] == url) {
            blacklist = true;
            break;
        }
    return { url, blacklist };
}
//# sourceMappingURL=app.service.js.map