import express from 'express'
import client from '../models/db'
import { v4 as uuidv4 } from 'uuid';

enum StatusCodes {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

async function signup(req: express.Request, res: express.Response) {
    // res.send('Signup Route')

    // create a new user

    const { name, password } = req.body;

    // check if the user already exists

    const checkQueryText = `SELECT * FROM users WHERE name = $1`;

    const result = await client.query(checkQueryText, [name]);
    if (result.rows.length > 0) {
        res.status(StatusCodes.BAD_REQUEST).send('User already exists');
        return;
    }

    // if the user does not exist, create a new user

    const queryText = `INSERT INTO users (id, name, password, created_date, modified_date) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;

    try {
        const result = await client.query(queryText, [uuidv4(), name, password]);
        console.log(result);
        res.status(StatusCodes.CREATED).send('User created successfully');
    }
    catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('An error occurred');

    }
}



async function login(req: express.Request, res: express.Response) {
    // res.send('Login Route')

    // check if the user exists
    const { name, password } = req.body;

    const queryText = `SELECT * FROM users WHERE name = $1 AND password = $2`;

    const result = await client.query(queryText, [name, password]);

    if (result.rows.length === 0) {
        res.status(StatusCodes.UNAUTHORIZED).send('Invalid credentials');
        return;
    }

    res.status(StatusCodes.OK).send('Login successful');

}


export { signup, login }