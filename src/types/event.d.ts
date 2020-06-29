import {Document, Types} from 'mongoose';
import {IMatch} from "./match";

interface IPlayer extends Document {
    name: string;
    type: string;
    runsScored: number;
    ballFaced: number;
    fours: number;
    sixes: number;
    runsConceded: number;
    wicketsTaken: number;
    matchesPlayed: number;
    average: number;
}

interface ITeam extends Document {
    name: string
    matchesPlayed: number;
    matchesWon: number;
    matchesLost: number;
    points: number;
    players: Types.Map<IPlayer>;
}

interface IEvent extends Document {
    type: 'Tournament' | 'Series' | 'Exhibition';
    name: string;
    numberOfOvers: number;
    winningTeam: string;
    status: 'League' | 'Completed' | 'Abandoned' | 'Tie' | 'NotStarted' | 'Knockout';
    completed: boolean;
    numberOfTeams: number;
    knockoutMatches: number;
    header: 'Single' | 'Double';
    teams: Types.Map<ITeam>;
    owner: Types.ObjectId;
    matches: IMatch[];
}
