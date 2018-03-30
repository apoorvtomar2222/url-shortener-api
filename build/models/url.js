'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const urlSchema = _mongoose2.default.Schema({
    url: {
        type: String,
        index: true,
        unique: true

    },
    shorturl: {
        type: String
    },
    hit: {
        type: Number,
        default: 0
    },
    time: {
        type: String
    }

});

const urlModel = _mongoose2.default.model('url', urlSchema);

exports.default = urlModel;