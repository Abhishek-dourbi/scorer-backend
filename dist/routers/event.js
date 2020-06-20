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
const event_1 = __importDefault(require("../models/event"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../middlewares/auth"));
router.post('/events', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { header, type, numberOfTeams, numberOfMatches } = req.body;
        let tourMatches = 0;
        if (type === "Exhibition" && numberOfTeams > 2) {
            res.status(400).send({ error: 'No more than 2 teams allowed in an exhibition match' });
            return;
        }
        if (type === "Tournament") {
            if (header === "Single") {
                tourMatches = ((numberOfTeams * (numberOfTeams - 1)) / 2);
            }
            else {
                tourMatches = (numberOfTeams * (numberOfTeams - 1));
            }
            if (numberOfTeams > 4) {
                tourMatches += 4;
            }
            else {
                tourMatches += 1;
            }
        }
        const event = new event_1.default(Object.assign(Object.assign({}, req.body), { numberOfMatches: type === "Tournament" ? tourMatches : numberOfMatches, owner: req.user._id }));
        yield event.save();
        res.status(201).send(event);
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
exports.default = router;
//# sourceMappingURL=event.js.map