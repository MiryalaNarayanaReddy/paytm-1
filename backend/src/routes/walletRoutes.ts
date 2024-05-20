import express from 'express';
import client from '../models/db';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// wallets(
//     id UUID PRIMARY KEY,
//     balance NUMERIC NOT NULL,
//     user_id UUID REFERENCES users(id),
//     created_date TIMESTAMP,
//     modified_date TIMESTAMP
//   )`;

router.post('/create', (req, res) => {
    
    const user = req.body.user;

    const queryText = `
        INSERT INTO wallets ( id, balance, user_id, created_date, modified_date) VALUES ($1, 1000, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    client.query(queryText, [uuidv4(), user.id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send('An error occurred');
        } else {
            res.status(200).send('Wallet created successfully');
        }
    });
});




router.get('/balance', (req, res) => {

    const user = req.body.user;

    console.log(user);

    const queryText = `
        SELECT balance FROM wallets WHERE user_id = $1 LIMIT 1
    `;

    client.query(queryText, [user.id], (err, result) => {
        console.log(result);

        if (result.rows.length === 0) {
            res.status(404).send('Wallet not found');
            return;
        }

        if (err) {
            console.log(err);
            res.status(400).send('An error occurred');
        } else {
            res.status(200).json(
                {
                    balance: result.rows[0].balance
                }
            );
        }
    });
}) 

export default router;