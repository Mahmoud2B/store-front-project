import express from 'express';
import jwt from 'jsonwebtoken';
const checkJWT = async (
    req: express.Request,
    res: express.Response,
    next: Function
) => {
    console.log("Inside middleware");
    
    try {
        jwt.verify(req.body.token, process.env.TOKEN_SECRET ?? '');
        next();
    } catch (error) {
        res.status(401).send('Token not valid');
        return;
    }
};

export default checkJWT;
