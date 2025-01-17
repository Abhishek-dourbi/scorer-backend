import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded: any = jwt.verify(token, 'scorerDevApp');
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});
        if(!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
};

export default auth;
