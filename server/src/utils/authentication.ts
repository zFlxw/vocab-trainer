import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

/**
 * Checks whether the request contains a valid JWT token or not.
 * 
 * @param req The request.
 * @param res The response.
 * @param next A callback that will be executed after the token validation.
 * @returns An error if the token is invalid.
 */
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

/**
 * Generates a new JWT with the user's name and id.
 * 
 * @param user The user.
 * @param callback A callback that will be executed after the token generation.
 */
export function signToken(user: { id: number, username: string },
                          callback: (error: Error | null, token: string | null) => void) {
    try {
        jwt.sign({ id: user.id, username: user.username }, process.env.TOKEN_SECRET!!, {
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

/**
 * Decodes a JWT token to a token object.
 * 
 * @param token the token to decode.
 * @returns the decoded token.
 */
export function decodeToken(token: string): Token | null {
  if (!token) {
    return null;
  }

  return jwt.decode(token) as Token;
}

interface Token {
  id: number,
  username: string,
  iat: number,
  exp: number
}
