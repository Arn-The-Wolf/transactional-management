const mongoose = require('mongoose');
require('dotenv').config();

// Connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err));

// Schemas
const AccountSchema = new mongoose.Schema({
    name: String,
    balance: Number
});
const Account = mongoose.model('Account', AccountSchema);

async function transferFunds(fromId, toId, amount) {
    if (!fromId || !toId || !amount) {
        throw new Error("Missing required parameters: fromId, toId, and amount are required");
    }

    if (amount <= 0) {
        throw new Error("Amount must be greater than 0");
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const from = await Account.findById(fromId).session(session);
        const to = await Account.findById(toId).session(session);

        if (!from || !to) {
            throw new Error("One or both accounts not found");
        }

        if (from.balance < amount) {
            throw new Error(`Insufficient funds. Current balance: ${from.balance}`);
        }

        from.balance -= amount;
        to.balance += amount;

        await from.save({ session });
        await to.save({ session });

        await session.commitTransaction();
        console.log(`✅ Successfully transferred ${amount} from ${from.name} to ${to.name}`);
        return { from, to };
    } catch (err) {
        await session.abortTransaction();
        console.error('❌ Transaction aborted:', err.message);
        throw err;
    } finally {
        session.endSession();
    }
}

module.exports = {
    transferFunds,
    Account
};
