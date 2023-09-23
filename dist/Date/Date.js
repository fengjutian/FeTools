"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamp2time = exports.Now = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
/**
 * 当前时间
 * @returns
 */
const Now = () => {
    return (0, dayjs_1.default)();
};
exports.Now = Now;
/**
 * 时间戳转化为时间
 * @param Timestamp
 * @returns
 */
const timestamp2time = (Timestamp) => {
    let date1 = new Date(Timestamp);
    return date1.toLocaleDateString().replace(/\//g, "-") + " " + date1.toTimeString().substr(0, 8);
};
exports.timestamp2time = timestamp2time;
