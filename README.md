# Transaction Management System

A Node.js application that demonstrates secure fund transfers between accounts using MongoDB transactions.

## Features

- Secure fund transfers with transaction support
- MongoDB integration with Mongoose
- Environment variable configuration
- Initial account seeding
- Error handling and validation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- MongoDB Compass (optional, for database visualization)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd transaction-management
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```
MONGO_URI=mongodb://localhost:27017/transaction-management
```

## Database Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Open MongoDB Compass
3. Connect to: `mongodb://localhost:27017`
4. Create a new database named `transaction-management`
5. Create a collection named `accounts`

## Usage

1. Seed the database with initial accounts:

```bash
node seed.js
```

This will create three accounts:

- Arnold: $100
- Elvin: $50
- Ivan: $1000

2. Run the main application:

```bash
node index.js
```

3. To make a transfer, modify the example in `index.js`:

```javascript
const fromId = "SENDER_ACCOUNT_ID"; // Replace with actual ID
const toId = "RECIPIENT_ACCOUNT_ID"; // Replace with actual ID
await transferFunds(fromId, toId, 25);
```

## Project Structure

- `index.js` - Main application file
- `transaction.js` - Transaction logic and database models
- `seed.js` - Database seeding script
- `.env` - Environment variables (create this file)

## Error Handling

The application includes comprehensive error handling for:

- Invalid account IDs
- Insufficient funds
- Database connection issues
- Invalid transfer amounts

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License.
