import express from 'express';
import client from '../models/db';

const router = express.Router();

router.post('/transfer', (req, res) => {
    // res.send('Transfer Route')

    // transfer money from one user to another

    const { sender_id, receiver_id, amount } = req.body;

    // check if the sender has enough balance
    // if not, return an error message

    
});

router.get('/otherusers', (req, res) => {
    // res.send('Other Users Route')

    // get all users except the current user

    const user =  req.body.user;

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
    // res.send('History Route')

    // get the user's transaction history

    const username = "emma watson";

    // const queryText = `
    //     SELECT * FROM transactions 
    //     WHERE sender_id = (SELECT id FROM users WHERE name = $1 LIMIT 1) 
    // `;

    // return sender name, receiver name, amount

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
            sender_user.id = (SELECT id FROM users WHERE name = $1 LIMIT 1)
            OR 
            receiver_user.id = (SELECT id FROM users WHERE name = $1 LIMIT 1)
    `;


    client.query(queryText, [username], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send('An error occurred');
        } else {
            console.log(result.rows);
            res.status(200).json(result.rows); // Send the result to the client
        }
    });
});

export default router;
