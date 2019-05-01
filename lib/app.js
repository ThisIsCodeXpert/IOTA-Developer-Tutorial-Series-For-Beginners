'use strict';

var _core = require('@iota/core');

console.log("Connecting to IOTA devnet...");

var iota = (0, _core.composeAPI)({
    provider: 'https://nodes.devnet.iota.org:443'
});

console.log("Connected to IOTA devnet!");

iota.getNodeInfo().then(function (info) {
    return console.log(info);
}).catch(function (error) {
    console.log('Request error: ' + error.message);
});

var SEED = 'DSIOSVMDGLRZUIGOTZHACZGQEJYMMLXSWKTBMIGKXRNW9YIERRRIFKRGQRHCSQP9WTGJGVIRIHQNDEFSE';
var ADDRESS = 'LOOJAEBGFVCENJTGZN9LJHSGFVWSYVXLOPSUWDHXBFCWOAOVUVPVOYKEWEHSNGBWBQIKQM9D9KBFIUDH9NEVNVQNOC';

var addresses = iota.getNewAddress(SEED, { index: 1, total: 1, security: 2, checksum: true, returnAll: false }, function (error, success) {

    if (error) {
        console.log(error);
    } else {

        console.log(success[0]);
    }
});

/*
function sendIOTA(seed, value, address){

    const transfers = [{
        address:address,
        value:value,
        tag:'',
        message: ''
    }]

    const depth = 3

    const minWeightMagnitude = 9


    iota.prepareTransfers(seed, transfers)
        .then(trytes => iota.sendTrytes(trytes, depth, minWeightMagnitude))
        .then(bundle => {
            console.log(`Published transaction with tail hash : ${bundle[0].hash}`)
        })
        .catch(err => {console.log(err)})

}

sendIOTA(SEED, 10, ADDRESS)

*/