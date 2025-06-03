const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    });

// Import the transfer function
const { transferFunds } = require('./transaction');

// Example usage
async function main() {
    try {
        // First run seed.js to create initial accounts
        console.log("Please run 'node seed.js' first to create initial accounts");

        // Example transfer (uncomment after running seed.js)
        // const fromId = "ALICE_ACCOUNT_ID"; // Replace with actual ID from seed.js
        // const toId = "BOB_ACCOUNT_ID";     // Replace with actual ID from seed.js
        // await transferFunds(fromId, toId, 25);

    } catch (error) {
        console.error("Error:", error.message);
    }
}

main(); 