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

connectDB();

fetchCryptoPrices();
cron.schedule('0 */2 * * *', () => {
  console.log('Fetching cryptocurrency prices...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
