const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const eventsRouter = require('./routers/event');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(eventsRouter);

app.listen(port, () => {
    console.log('App running on ' + port);
});
