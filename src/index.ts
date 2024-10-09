import * as express from 'express';
import * as cron from 'node-cron';
import fetchCryptoPrices from './fetchPrice';
import connectDB from './database/db';

// Initialize the express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', () => {
  console.log('Fetching cryptocurrency prices...');
  fetchCryptoPrices();
});

// Start the servernpm install typescript --save-dev

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
