"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const match_1 = __importDefault(require("../models/match"));
const event_1 = __importDefault(require("../models/event"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.post('/match', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId, firstTeamName, secondTeamName } = req.body;
    const event = event_1.default.findById(eventId);
    const matchesPlayed = event.matches.filter(mat => (mat.firstTeamName === firstTeamName && mat.secondTeamName === secondTeamName) || (mat.secondTeamName === firstTeamName && mat.firstTeamName === secondTeamName));
    if (event.type === "Tournament" && event.header === "Double" && matchesPlayed.length === 2 && event.status !== "Knockout") {
        res.status(400).send({ error: `All matches between ${firstTeamName} and ${secondTeamName} has been completed` });
        return;
    }
    if (event.type === "Tournament" && event.header === "Single" && matchesPlayed.length === 1 && event.status !== "Knockout") {
        res.status(400).send({ error: `All matches between ${firstTeamName} and ${secondTeamName} has been completed` });
        return;
    }
    const match = new match_1.default(Object.assign(Object.assign({}, req.body), { eventId }));
    try {
        yield match.save();
        res.status(201).send(match);
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
//# sourceMappingURL=match.js.map