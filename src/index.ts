import express from 'express';
import ('./db/mongoose');
import userRouter from './routers/user';
import eventsRouter from './routers/event';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(eventsRouter);

app.listen(port, () => {
    console.log('App running on ' + port);
});
