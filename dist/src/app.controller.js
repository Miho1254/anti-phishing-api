"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const config_1 = __importDefault(require("../config"));
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async getAll() {
        return await this.appService.getAllLinksAndDomain();
    }
    async getAllLinks() {
        return await this.appService.getAllLinks();
    }
    async getAllDomains() {
        return await this.appService.getAllDomains();
    }
    async addDomain(header, body) {
        if (header.authorization !== config_1.default.authorization)
            throw new common_1.UnauthorizedException('Unauthorized!');
        const url = body === null || body === void 0 ? void 0 : body.url;
        if (!url)
            throw new common_1.BadRequestException('No url provided!');
        return await this.appService.addDomain(url);
    }
    async addLink(header, body) {
        if (header.authorization !== config_1.default.authorization)
            throw new common_1.UnauthorizedException('Unauthorized!');
        const url = body === null || body === void 0 ? void 0 : body.url;
        if (!url)
            throw new common_1.BadRequestException('No url provided!');
        return await this.appService.addLink(url);
    }
    async check(query) {
        const url = query === null || query === void 0 ? void 0 : query.url;
        if (!url)
            throw new common_1.BadRequestException('No url provided!');
        return await this.appService.check(url);
    }
    async rapidreport(query) {
        const url = query === null || query === void 0 ? void 0 : query.url;
        if (!url)
            throw new common_1.BadRequestException('No url provided!');
        return await this.appService.rapidreport(url, query === null || query === void 0 ? void 0 : query.message);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('links'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllLinks", null);
__decorate([
    (0, common_1.Get)('domains'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllDomains", null);
__decorate([
    (0, common_1.Post)('adddomain'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "addDomain", null);
__decorate([
    (0, common_1.Post)('addlink'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "addLink", null);
__decorate([
    (0, common_1.Get)('check'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "check", null);
__decorate([
    (0, common_1.Get)('rapidreport'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "rapidreport", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map