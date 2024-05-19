import client from "./db";

// uuid_generate_v4()

import { v4 as uuidv4 } from 'uuid';


// populate the user table with 10 users

interface User {
    name: string;
    password: string;
}

const users: User[] = [
    { name: "harry potter", password: "Higb2$67"},
    { name: "emma watson", password: "Wnns125" },
    { name: "ron weasley", password: "Rtjg$12"},
    { name: "hermione granger", password: "Hgj$12"},
    { name: "albus dumbledore", password: "Dmb$12"},
    { name: "severus snape", password: "Snp$12"},
    { name: "rubeus hagrid", password: "Hg$12"},
    { name: "draco malfoy", password: "Mlf$12"},
    { name: "luna lovegood", password: "Lvg$12"},
    { name: "ginny weasley", password: "Wls$12"},

]


/**
 * 
 *  id UUID PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP

 */

const populateUserTable = async () => {
    for (const user of users) {
        const queryText = `INSERT INTO users (id, name, password, created_date, modified_date) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
        try {
            const res = await client.query(queryText, [uuidv4(), user.name, user.password]);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
}


// populate the wallet table with 10 wallets

/**
 *  const queryText = `CREATE TABLE IF NOT EXISTS
      wallets(
        id UUID PRIMARY KEY,
        balance NUMERIC NOT NULL,
        user_id UUID REFERENCES users(id),
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;
 */

const populateWalletTable = async () => {
    for (const user of users) {
        const queryText = `INSERT INTO wallets (id, balance, user_id, created_date, modified_date) VALUES ($1, 1000, (SELECT id FROM users WHERE name = $2), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
        try {
            const res = await client.query(queryText, [uuidv4(), user.name]);
            console.log(res);
        } catch (err) {
            console.log(err);
        }

    }
}

// populate the transaction table with 10 transactions

/**
 *  const queryText = `CREATE TABLE IF NOT EXISTS
      transactions(
        id UUID PRIMARY KEY,
        amount NUMERIC NOT NULL,
        sender_id UUID REFERENCES users(id),
        receiver_id UUID REFERENCES users(id),
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;
 */

const populateTransactionTable = async () => {
    for (let i = 0; i < 9; i++) {
        const queryText = `INSERT INTO transactions (id, amount, sender_id, receiver_id, created_date, modified_date) VALUES ($1, 100, (SELECT id FROM users WHERE name = $2), (SELECT id FROM users WHERE name = $3), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
        try {
            const res = await client.query(queryText, [uuidv4(), users[i].name, users[i + 1].name]);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
}

const populateTablesdB = async () => {
    await populateUserTable()
    await populateWalletTable()
    await populateTransactionTable()
}


export default populateTablesdB;

