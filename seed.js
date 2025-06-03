const mongoose = require('mongoose');
require('dotenv').config(); // <== this loads .env

const AccountSchema = new mongoose.Schema({ name: String, balance: Number });
const Account = mongoose.model('Account', AccountSchema);

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        await Account.deleteMany({});
        const accounts = await Account.insertMany([
            { name: 'Arnold', balance: 100 },
            { name: 'Elvin', balance: 50 },
            { name: 'Ivan', balance: 1000 }
        ]);

        console.log("✅ Seeded database with initial accounts:");
        accounts.forEach(account => {
            console.log(`   - ${account.name}: $${account.balance} (ID: ${account._id})`);
        });

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error.message);
        process.exit(1);
    }
}

seed();
