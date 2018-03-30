import mongoose from 'mongoose';

const urlSchema = mongoose.Schema({
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

const urlModel = mongoose.model('url', urlSchema);

export default urlModel;