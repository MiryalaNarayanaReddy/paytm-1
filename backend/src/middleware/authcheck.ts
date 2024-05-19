import express from 'express'


function authCheck(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('Auth Middleware')
    next()
}

export default authCheck;