import * as express from 'express';
import * as cron from 'node-cron';
import fetchCryptoPrices from './fetchPrice';
import connectDB from './database/db';
import { router } from './api/stats';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/stats', router);

connectDB();

cron.schedule('0 */2 * * *', () => {
  console.log('Fetching cryptocurrency prices...');
  fetchCryptoPrices();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
