"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectionURL = 'mongodb://Abhidourbi:venu1010@dbh29.mlab.com:27297/scorer-dev';
mongoose_1.default.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        return console.log('Unable to connect to database', err);
    }
    console.log('Connected to database successfully');
});
//# sourceMappingURL=mongoose.js.map