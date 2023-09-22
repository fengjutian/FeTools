"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamp2time = void 0;
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
