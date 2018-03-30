import express from 'express';
import request from 'request';
import UrlModel from '../models/url'
import urlModel from '../models/url';
const load = (url) => {
    return new Promise((resolve, reject) => {
        request({
            url: "https://is.gd/create.php?format=simple&url=" + url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('Body', body);
                resolve(body)
                // callback(null, body);
            } else {
                this.emit('error', new Error('Bad status code'));
            }
        })

    });
}

const addtoDb = (url) => {
    return new Promise((resolve, reject) => {
        let urlmodelinstance = new UrlModel(url);
        urlmodelinstance.save(url, (error, result) => {
            if (error) { console.log("Error", error) }
            else {
                resolve(result);
            }
        })
    })
}

async function urlshortnerFunction(urllist, callback) {
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
        let shortnedurl = await load(item.url);
        console.log('Item', item);
        item.shorturl = shortnedurl;
        item.time = todaydate

        let finalsaveddata = await addtoDb(item);

    }
    callback(null);

}

let shortnercontroller = express.Router()

shortnercontroller.post('/', (req, res, callback) => {
    console.log('Called', req.body);

    let datatobetrimmed = req.body;
    urlshortnerFunction(datatobetrimmed, () => {

        UrlModel.find({}, (error, result) => {
            if (!error) {
                console.log('Result form callback', result);
                res.send(result);
            }
        }).sort({ field: 'asc', _id: -1 }).limit(3)
    })

});

shortnercontroller.get('/geturls', (req, res) => {
    UrlModel.find({}, (error, result) => {
        if (!error) { res.send(result); }
    }).sort({ field: 'asc', _id: -1 }).limit(3);
})

export default shortnercontroller