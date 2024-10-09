import { Router } from "express";
import CryptoPrice from "../database/model";

export const router = Router();

router.get('/', async (req, res): Promise<any> => {
    console.log("Data Requested");
    try {
        let coin = req.query.coin;

        if (!coin) {
            return res.status(400).json({ error: 'Name query parameter is required.' });
        }

        if (coin === "matic-network") {
            coin = "Polygon";
        }

        console.log("Searching for coin:", coin);

        // @ts-ignore
        const coindetails = await CryptoPrice.findOne({ name: { $regex: new RegExp(coin, 'i') } });

        if (!coindetails) {
            return res.status(404).json({ error: 'Coin not found.' });
        }

        const responseData = {
            price: coindetails.price,
            marketCap: coindetails.marketCap,
            change24h: coindetails.change24h,
        };

        res.json(responseData);
    } catch (error) {
        console.error("Database query error:", error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});


