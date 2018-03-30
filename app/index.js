import config from 'config';
import mongoose from 'mongoose'
import http from 'http';
import express from 'express';
import cors from 'cors'
import bodyParser from "body-parser";
import shortnerrouter from './routes/shortner'

let app = express();
let port = config.port || 8080;

/* add express middleware to app */
app.use(bodyParser.urlencoded());    // bodyparser urlencoded
app.use(bodyParser.json());
app.use(cors());    // bodyparser json;
// app.use(morgan('dev'));              // morgan http-request-logger

let router = express.Router();

mongoose.connect('mongodb://user:user@ds125195.mlab.com:25195/tripoto', (err, db) => {
    if (err) {
        console.log('err', err);
    }
    else { console.log('Connected to Db') }
});

router.get('/hello', (req, res) => {
    res.send('Hello World!')
});

router.use('/shortner', shortnerrouter)

app.use(router);

let server = http.createServer(app);
server.listen(process.env.PORT || 4000, () => {
    console.log('API Server is listening on port: 4000');
});
