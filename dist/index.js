"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fetchPrice_1 = require("./fetchPrice");
const db_1 = require("./database/db");
// Initialize the express app
const app = express();
const PORT = process.env.PORT || 3000;
// Connect to MongoDB
(0, db_1.default)();
// Schedule the job to run every 2 hours
// cron.schedule('0 */2 * * *', () => {
console.log('Fetching cryptocurrency prices...');
(0, fetchPrice_1.default)();
// });
// Start the servernpm install typescript --save-dev
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
