import {Document, Types, Model} from 'mongoose';

interface IToken extends Document{
    token: string
}

export interface IUser extends Document {
    name: string;
    age: number;
    email: string;
    password: string;
    token: Types.Array<IToken>;
}

export interface IUserModel extends IUser{
    generateAuthToken(): string;
}

export interface IUserSchema extends Model<IUserModel>{
    findByCredentials(email: string, password: string): IUserModel
}
