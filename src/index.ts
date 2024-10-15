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
  res.send(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f0f0f0;
          }
          .container {
            display: flex;
            flex-wrap: wrap;
            width: 80%;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 1200px;
          }
          .section {
            width: 100%; /* Full width on mobile */
            margin-bottom: 20px;
            padding: 10px;
            box-sizing: border-box;
          }
          h2 {
            text-align: center;
            color: #333;
          }
          ul {
            list-style-type: none;
            padding: 0;
            text-align: center;
          }
          li {
            margin: 10px 0;
          }
          a {
            text-decoration: none;
            color: #007bff;
            font-weight: bold;
          }
          a:hover {
            color: #0056b3;
          }

          /* Media query for desktop or larger screens */
          @media (min-width: 768px) {
            .container {
              flex-direction: row;
            }
            .section {
              width: 45%; /* Two sections side by side on larger screens */
              margin: 0 2.5%;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="section">
            <h2>Stats</h2>
            <ul>
              <li><a href="/stats?coin=bitcoin">Bitcoin</a></li>
              <li><a href="/stats?coin=ethereum">Ethereum</a></li>
              <li><a href="/stats?coin=matic-network">Polygon</a></li>
            </ul>
          </div>
          <div class="section">
            <h2>Deviation</h2>
            <ul>
              <li><a href="/deviation?coin=bitcoin">Bitcoin</a></li>
              <li><a href="/deviation?coin=ethereum">Ethereum</a></li>
              <li><a href="/deviation?coin=matic-network">Polygon</a></li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  `);
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
