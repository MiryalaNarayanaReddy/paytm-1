import express from 'express'
import jwt from 'jsonwebtoken'


function authCheck(req: express.Request, res: express.Response, next: express.NextFunction) {
    // console.log('Auth Middleware')

    // get the token from the request header

    let token = req.header('authorization');

    // check if the token exists

    if (!token) {
        res.status(401).send('Access denied. No token provided');
        return;
    }

    // verify the token

    token = token.split(' ')[1]; // remove the Bearer keyword

    try {
        const decoded = jwt.verify(token, 'secret');
        // console.log(decoded);
        req.body.user = decoded;

        next();
    }
    catch (err) {
        res.status(400).send('Invalid token');
        return;
    }
}

export default authCheck;