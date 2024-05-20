import express from 'express';
import client from '../models/db';
import { Session } from 'inspector';
import {v4 as uuidv4} from 'uuid';

const router = express.Router();
router.post('/send', async (req, res) => {
    const user = req.body.user;
    const to_id = req.body.to_id;
    const amount = req.body.amount;

    try {
        // Check if the user has enough balance
        const balanceResult = await client.query(`
            SELECT balance FROM wallets WHERE user_id = $1
        `, [user.id]);

        if (balanceResult.rows.length === 0) {
            return res.status(400).send('User not found');
        }

        const balance = balanceResult.rows[0].balance;
        if (balance < amount) {
            return res.status(400).send('Insufficient balance');
        }

        // Begin transaction
        await client.query('BEGIN');

        // Deduct the amount from the user's balance
        await client.query(`
            UPDATE wallets SET balance = balance - $1 WHERE user_id = $2
        `, [amount, user.id]);

        // Add the amount to the receiver's balance
        await client.query(`
            UPDATE wallets SET balance = balance + $1 WHERE user_id = $2
        `, [amount, to_id]);

        // Add the transaction to the transactions table
        await client.query(`
            INSERT INTO transactions (id, amount, sender_id, receiver_id, created_date, modified_date)
            VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `, [uuidv4(), amount, user.id, to_id]);

        // Commit transaction
        await client.query('COMMIT');

        res.status(200).send('Transaction successful');
    } catch (err) {
        console.log(err);
        // Rollback transaction in case of error
        await client.query('ROLLBACK');
        res.status(400).send('An error occurred');
    }
});


router.get('/otherusers', (req, res) => {
    // res.send('Other Users Route')

    // get all users except the current user

    const user = req.body.user;

    const queryText = `
        SELECT id, name FROM users WHERE name != $1
    `;

    client.query(queryText, [user.name], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send('An error occurred');
        } else {
            // console.log(result.rows);
            res.status(200).json(result.rows); // Send the result to the client
        }
    });

});

router.get('/history', (req, res) => {


    // const username = req.body.user.name;

    const user =    req.body.user;

    // const queryText = `
    //     SELECT 
    //         sender_user.name AS sender, 
    //         receiver_user.name AS receiver, 
    //         transactions.amount
    //     FROM 
    //         transactions
    //     JOIN 
    //         users AS sender_user ON transactions.sender_id = sender_user.id
    //     JOIN 
    //         users AS receiver_user ON transactions.receiver_id = receiver_user.id
    //     WHERE 
    //         sender_user.id = (SELECT id FROM users WHERE name = $1 LIMIT 1)
    //         OR 
    //         receiver_user.id = (SELECT id FROM users WHERE name = $1 LIMIT 1)
    // `;

    const queryText = `
        SELECT 
            sender_user.name AS sender, 
            receiver_user.name AS receiver, 
            transactions.amount
        FROM 
            transactions
        JOIN 
            users AS sender_user ON transactions.sender_id = sender_user.id
        JOIN 
            users AS receiver_user ON transactions.receiver_id = receiver_user.id
        WHERE 
            sender_user.id = $1
            OR 
            receiver_user.id = $1
    `;


    client.query(queryText, [user.id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send('An error occurred');
        } else {
            console.log(result.rows);
            // res.status(200).json(result.rows); // Send the result to the client
            res.status(200).json(result.rows);
          
        }
    });
});

export default router;
