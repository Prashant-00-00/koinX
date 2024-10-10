import * as express from 'express';
import * as cron from 'node-cron';
import fetchCryptoPrices from './fetchPrice';
import connectDB from './database/db';
import { router } from './api/stats';
import { deviationrouter } from './api/deviation';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/stats', router);
app.use('/deviation', deviationrouter);

app.get("/", (req, res) => {
  res.json({
    message: "Please go to the specified endpoints:",
    endpoints: [
      { url: "/stats?coin=bitcoin", description: "Fetch stats for Bitcoin" },
      { url: "/stats?coin=ethereum", description: "Fetch stats for Ethereum" },
      { url: "/stats?coin=matic-network", description: "Fetch stats for Polygon" },
      { url: "/deviation?coin=bitcoin", description: "Fetch deviation for Bitcoin" },
      { url: "/deviation?coin=matic-network", description: "Fetch deviation for Polygon" },
      { url: "/deviation?coin=ethereum", description: "Fetch deviation for Ethereum" }
    ]
  });
});


connectDB();

fetchCryptoPrices();
cron.schedule('0 */2 * * *', () => {
  console.log('Fetching cryptocurrency prices...');
fetchCryptoPrices();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
