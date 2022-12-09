"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.warn = exports.info = exports.error = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(timezone_1.default);
dayjs_1.default.extend(utc_1.default);
const chalk_1 = __importDefault(require("chalk"));
const timeNow = () => (0, dayjs_1.default)()
    .tz(process.env.TZ || 'America/Chicago')
    .format('MM/DD/YYYY hh:mm:ss');
const msg = (func, message) => func(chalk_1.default.yellow(`[${timeNow()}]`) + ' ' + chalk_1.default.green(message));
const error = (message = 'Unknown error', err) => {
    console.error(chalk_1.default.yellow(timeNow()) + ' Error: ' + chalk_1.default.red(message));
    console.error(err);
};
exports.error = error;
const info = (message) => {
    msg(console.info, message);
};
exports.info = info;
const warn = (message) => msg(console.warn, `${chalk_1.default.yellow('WARNING ->')} -> ${message}`);
exports.warn = warn;
//# sourceMappingURL=log.js.map