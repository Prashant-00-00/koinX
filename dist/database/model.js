"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cryptoPriceSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    marketCap: { type: Number, required: true },
    change24h: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});
const CryptoPrice = mongoose_1.default.model('CryptoPrice', cryptoPriceSchema);
exports.default = CryptoPrice;
