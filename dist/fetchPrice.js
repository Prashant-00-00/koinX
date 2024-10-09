"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const model_1 = require("./database/model");
const COINGECKO_URL = 'https://api.coingecko.com/api/v3/coins/';
const COINS = ['bitcoin', 'matic-network', 'ethereum'];
const fetchCryptoPrices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const coin of COINS) {
            const response = yield axios_1.default.get(`${COINGECKO_URL}${coin}`, {
                headers: { accept: 'application/json' },
            });
            const data = response.data;
            const newPrice = new model_1.default({
                name: data.name,
                price: data.market_data.current_price.usd,
                marketCap: data.market_data.market_cap.usd,
                change24h: data.market_data.price_change_24h,
            });
            yield newPrice.save();
            console.log(`Saved ${coin} data: `, newPrice);
        }
    }
    catch (error) {
        console.error('Error fetching crypto prices:', error);
    }
});
exports.default = fetchCryptoPrices;
