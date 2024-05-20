import client from "./db";

// create a user table

const createUserTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  try {
    const res = await client.query(queryText);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

// create a wallet table with a foreign key to the user table

const createWalletTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      wallets(
        id UUID PRIMARY KEY,
        balance NUMERIC NOT NULL,
        user_id UUID REFERENCES users(id),
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  try {
    const res = await client.query(queryText);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};


// create transaction table with foreign keys to users 

const createTransactionTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      transactions(
        id UUID PRIMARY KEY,
        amount NUMERIC NOT NULL,
        sender_id UUID REFERENCES users(id),
        receiver_id UUID REFERENCES users(id),
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  try {
    const res = await client.query(queryText);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};


// clear the tables

const clearTablesdB = async () => {
  const queryText = `DROP TABLE IF EXISTS transactions, wallets, users`;

  try {
    const res = await client.query(queryText);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};




function createTablesdB() {
  createUserTable();
  createWalletTable();
  createTransactionTable();
}

// createTables();

export {
  createTablesdB,
  clearTablesdB
}