import { Router } from "express";
import CryptoPrice from "../database/model";
export const deviationrouter = Router();

deviationrouter.get('/', async (req, res): Promise<any> => {
    try {
        let coin = req.query.coin;

        if (!coin) {
            return res.status(400).json({ error: 'Coin query parameter is required.' });
        }

        if (coin === "matic-network") {
            coin = "Polygon";
        }


        console.log("Calculating deviation for coin:", coin);

        //@ts-ignore
        const matchStage = { $match: { name: { $regex: new RegExp(coin, 'i') } } };


        const pipeline = [
            matchStage,
            { $sample: { size: 100 } },
            { $group: { _id: null, priceStdDev: { $stdDevSamp: "$price" } } }
        ];

        const result = await CryptoPrice.aggregate(pipeline);

        if (!result.length || result[0].priceStdDev === null) {
            return res.status(404).json({ error: 'Coin not found or not enough records available.' });
        }

        const deviation = parseFloat(result[0].priceStdDev.toFixed(2));
        console.log(deviation);
        res.json({ deviation });
    } catch (error) {
        console.error("Database query error:", error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});