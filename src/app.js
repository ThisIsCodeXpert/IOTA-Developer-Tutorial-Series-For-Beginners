import HMKit from 'hmkit'
import { composeAPI } from '@iota/core'
import { generateAddress } from '@iota/core'

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
})

const iota = composeAPI({
  provider: 'https://nodes.devnet.iota.org:443'
})

const hmkit = new HMKit(
  '...'
)

const vehicleSeed = '...'

const accessTokenVehicle = '...'

const chargerSeed = '...'

const accessTokenCharger = '...'

class HMVehicle {
  constructor (seed) {
    this.seed = seed
  }

}

class HMCharger {
  constructor (seed) {
    this.seed = seed
  }

}

async function app () {
  try {
    // init vehicle object
    var vehicle = new HMVehicle(vehicleSeed)
    console.log('Vehicle initialized.')

    // init charger object
    var charger = new HMCharger(chargerSeed)
    console.log('Charger initialized.')

}

// Run your app
app()
