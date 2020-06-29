import {Document, Types} from 'mongoose';

interface IToken extends Document{
    token: string
}

export interface IUser extends Document {
    name: string;
    age: number;
    email: string;
    password: string;
    token: Types.Array<IToken>
}
