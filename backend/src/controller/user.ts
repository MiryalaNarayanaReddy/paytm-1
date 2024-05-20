import express from 'express'
import client from '../models/db'
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;



// enum for status codes

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

    const checkQueryText = `SELECT * FROM users WHERE name = $1 LIMIT 1`;

    const result = await client.query(checkQueryText, [name]);


    if (result.rows.length > 0) {
        res.status(StatusCodes.BAD_REQUEST).send('User already exists');
        return;
    }

    // if the user does not exist, create a new user

    // hash the password
    // const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    // const hash = bcrypt.hashSync(password, salt);

    const hashpassword = bcrypt.hashSync(password, SALT_ROUNDS);


    const queryText = `INSERT INTO users (id, name, password, created_date, modified_date) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;

    try {
        const result = await client.query(queryText, [uuidv4(), name, hashpassword]);
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

    const queryText = `SELECT * FROM users WHERE name = $1 LIMIT 1`; // LIMIT 1 is used to return only one row

    const result = await client.query(queryText, [name]);
    
    if (result.rows.length === 0) {
        res.status(StatusCodes.NOT_FOUND).send('User not found');
        return;
    }

    // compare the password

    const isMatch = bcrypt.compareSync(password, result.rows[0].password);

    if (!isMatch) {
        res.status(StatusCodes.UNAUTHORIZED).send('Invalid credentials');
        return;
    }

    const token = jwt.sign({
        name: result.rows[0].name,
        id: result.rows[0].id,
    }, 'secret',
        { expiresIn: '1h' });

    res.status(StatusCodes.OK).send(
        {
            token: token,
            id: result.rows[0].id,
            name: result.rows[0].name
        }
    );
}


export { signup, login }