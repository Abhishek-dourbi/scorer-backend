import {Document} from 'mongoose';

export interface IMatch extends Document {
    name: string;
    firstTeamName: string;
    secondTeamName: string;
    status: 'Ongoing' | 'Completed' | 'Abandoned' | 'Tie';
    completed: boolean;
    numberOfOvers: number;
    toss: string;
}
