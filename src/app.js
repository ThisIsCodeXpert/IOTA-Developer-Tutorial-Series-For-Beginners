import {composeAPI} from '@iota/core'


console.log("Connecting to IOTA devnet...")


const iota = composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
})

console.log("Connected to IOTA devnet!")

iota.getNodeInfo()
    .then(info => console.log(info))
    .catch(error => {
        console.log(`Request error: ${error.message}`)
    })


let SEED = 'DSIOSVMDGLRZUIGOTZHACZGQEJYMMLXSWKTBMIGKXRNW9YIERRRIFKRGQRHCSQP9WTGJGVIRIHQNDEFSE'
let ADDRESS = 'LOOJAEBGFVCENJTGZN9LJHSGFVWSYVXLOPSUWDHXBFCWOAOVUVPVOYKEWEHSNGBWBQIKQM9D9KBFIUDH9NEVNVQNOC'

let addresses = iota.getNewAddress(SEED, {index:1, total: 1, security: 2, checksum: true, returnAll: false}, (error, success) => {

    if(error){
        console.log(error)
    } else {

        console.log(success[0])
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