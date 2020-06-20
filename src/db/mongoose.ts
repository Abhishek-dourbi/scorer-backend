import mongoose from 'mongoose';

const connectionURL = 'mongodb://Abhidourbi:venu1010@dbh29.mlab.com:27297/scorer-dev';

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}, (err) => {
    if(err) {
        return console.log('Unable to connect to database', err);
    }
    console.log('Connected to database successfully');
});
