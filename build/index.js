'use strict';

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _shortner = require('./routes/shortner');

var _shortner2 = _interopRequireDefault(_shortner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let app = (0, _express2.default)();
let port = _config2.default.port || 8080;

/* add express middleware to app */
app.use(_bodyParser2.default.urlencoded()); // bodyparser urlencoded
app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)()); // bodyparser json;
// app.use(morgan('dev'));              // morgan http-request-logger

let router = _express2.default.Router();

_mongoose2.default.connect('mongodb://user:user@ds125195.mlab.com:25195/tripoto', (err, db) => {
    if (err) {
        console.log('err', err);
    } else {
        console.log('Connected to Db');
    }
});

router.get('/hello', (req, res) => {
    res.send('Hello World!');
});

router.use('/shortner', _shortner2.default);

app.use(router);

let server = _http2.default.createServer(app);
server.listen(port, () => {
    console.log('API Server is listening on port:', port);
});