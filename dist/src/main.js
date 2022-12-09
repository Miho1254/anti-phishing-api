"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const app_module_1 = require("./app.module");
const config_1 = __importDefault(require("../config"));
const scraper_1 = __importDefault(require("../scraper"));
const morgan_1 = __importDefault(require("morgan"));
const github_1 = __importDefault(require("../upload/github"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.use((0, morgan_1.default)('dev'));
    app.enableCors();
    await app.listen(config_1.default.port, '0.0.0.0');
    console.log(`Server running on port ${config_1.default.port}`);
}
(0, scraper_1.default)();
bootstrap();
setInterval(github_1.default, 1000 * 60 * 60 * 12);
//# sourceMappingURL=main.js.map