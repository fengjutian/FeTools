"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamp2time = exports.Now = void 0;
var dayjs_1 = require("dayjs");
/**
 * 当前时间
 * @returns
 */
var Now = function () {
    return (0, dayjs_1.default)();
};
exports.Now = Now;
/**
 * 时间戳转化为时间
 * @param Timestamp
 * @returns
 */
var timestamp2time = function (Timestamp) {
    var date1 = new Date(Timestamp);
    return date1.toLocaleDateString().replace(/\//g, "-") + " " + date1.toTimeString().substr(0, 8);
};
exports.timestamp2time = timestamp2time;
