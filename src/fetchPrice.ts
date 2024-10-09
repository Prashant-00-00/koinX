import axios from 'axios';
import CryptoPrice from './database/model';

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/coins/';
const COINS = ['bitcoin', 'matic-network', 'ethereum'];

const fetchCryptoPrices = async () => {
  try {
    for (const coin of COINS) {
      const response = await axios.get(`${COINGECKO_URL}${coin}`, {
        headers: { accept: 'application/json' },
      });

      const data = response.data;

      const newPrice = new CryptoPrice({
        name: data.name,
        price: data.market_data.current_price.usd,
        marketCap: data.market_data.market_cap.usd,
        change24h: data.market_data.price_change_24h,
      });

      await newPrice.save();
      console.log(`Saved ${coin} data: `, newPrice);
    }
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
  }
};

export default fetchCryptoPrices;
