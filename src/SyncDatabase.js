require('dotenv').config();
const readline = require('readline');
const bcrypt = require('bcrypt');
const db = require('./model/db');
const Admin = require('./model/Admin');
const ListPaymentMethod = require('./model/ListPaymentMethod');
const Payment = require('./model/Payment');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) => {
    return new Promise(resolve => rl.question(query, resolve));
};

const setupAdmin = async () => {
    const username = await askQuestion('Enter admin username: ');
    const password = await askQuestion('Enter admin password: ');

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
        username: username,
        password: hashedPassword
    });

    await admin.save();
    console.log('Admin setup complete');
};

const syncDatabase = async () => {
    await ListPaymentMethod.syncIndexes();
    await Payment.syncIndexes();
    await Admin.syncIndexes();
    console.log('Database synchronization complete');
};

const main = async () => {
    await setupAdmin();
    await syncDatabase();
    rl.close();
    process.exit(0);
};

main().catch(err => {
    console.error('Error during setup:', err);
    rl.close();
    process.exit(1);
});
