import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({message: 'No valid token found.'});
    }

    jwt.verify(token, process.env.TOKEN_SECRET!!, (error, decoded) => {
        if (error) {
            return res.status(404).json({message: error.message, error: error});
        }

        res.locals.jwt = decoded;
        next();
    });
}

export function signToken(user: { username: string, isAdmin: boolean },
                          callback: (error: Error | null, token: string | null) => void) {
    try {
        jwt.sign({username: user.username, isAdmin: user.isAdmin}, process.env.TOKEN_SECRET!!, {
            algorithm: 'HS256',
            expiresIn: '12h'
        }, (error, token) => {
            if (error) {
                callback(error, null);
            } else if (token) {
                callback(null, token);
            }
        })
    } catch (err) {
        console.error(err);
    }
}