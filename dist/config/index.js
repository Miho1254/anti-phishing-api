"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
if (dotenv_1.default.config().error) {
    if (!process.env.DOCKER)
        console.error('Failed to load enviroment variables');
    console.log('Using default config');
}
else
    console.log('Using settings from .env file');
const config = {
    redis: {
        host: process.env.REDIS_HOST || (process.env.DOCKER ? 'redis' : 'localhost'),
        port: parseInt(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD || '',
    },
    github: {
        token: process.env.GITHUB_TOKEN || null,
        repo: process.env.GITHUB_REPO || null,
    },
    timezone: process.env.TIMEZONE || 'America/Chicago',
    authorization: process.env.AUTHORIZATION || 'secret',
    identity: process.env.IDENTITY || 'phamleduy04/discord-phishing-backend',
    port: parseInt(process.env.PORT) || 3000,
};
exports.default = config;
//# sourceMappingURL=index.js.map