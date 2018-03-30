'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

let urlshortnerFunction = (() => {
    var _ref = _asyncToGenerator(function* (urllist, callback) {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!

        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        let todaydate = dd + '/' + mm + '/' + yyyy;
        console.log(urllist, 'urllist');

        for (let item of urllist) {
            let shortnedurl = yield load(item.url);
            console.log('Item', item);
            item.shorturl = shortnedurl;
            item.time = todaydate;

            let finalsaveddata = yield addtoDb(item);
        }
        callback(null);
    });

    return function urlshortnerFunction(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _url = require('../models/url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const load = url => {
    return new Promise((resolve, reject) => {
        (0, _request2.default)({
            url: "https://is.gd/create.php?format=simple&url=" + url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('Body', body);
                resolve(body
                // callback(null, body);
                );
            } else {
                this.emit('error', new Error('Bad status code'));
            }
        });
    });
};

const addtoDb = url => {
    return new Promise((resolve, reject) => {
        let urlmodelinstance = new _url2.default(url);
        urlmodelinstance.save(url, (error, result) => {
            if (error) {
                console.log("Error", error);
            } else {
                resolve(result);
            }
        });
    });
};

let shortnercontroller = _express2.default.Router();

shortnercontroller.post('/', (req, res, callback) => {
    console.log('Called', req.body);

    let datatobetrimmed = req.body;
    urlshortnerFunction(datatobetrimmed, () => {

        _url2.default.find({}, (error, result) => {
            if (!error) {
                console.log('Result form callback', result);
                res.send(result);
            }
        }).sort({ field: 'asc', _id: -1 }).limit(3);
    });
});

shortnercontroller.get('/geturls', (req, res) => {
    _url2.default.find({}, (error, result) => {
        if (!error) {
            res.send(result);
        }
    }).sort({ field: 'asc', _id: -1 }).limit(3);
});

exports.default = shortnercontroller;