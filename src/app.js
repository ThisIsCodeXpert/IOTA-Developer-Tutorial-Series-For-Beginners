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
    "dGVzdK75ilWWgfnLQkeGHLARrfSu2cPYm93lWjbzEHhfg42EDprW1EDpJwG6as9665pVWe+n27z2xWMCw5cEVejHFahdNjYGXGu0ZwCgI5T1kGt8BbkhPsWziWF1usBKn3vLZ2pauV5ZStU1unwZl5FG8hL7OZBCJ2JH6FH2+K3DlK8hN925RoMaRn8Dzoe8JhJVLehvTgd8",
    "Vsjmz2B0Hpfe4+ZEwpUP1L9IQkHNjH3tItGV2diEG0E="
);

const vehicleSeed = 'MYTRWBRSFSTWJ9UIYWNQUYBTCJLCDOUHGBKLXVRA9ABGQLJSNWENBCBDWTFDATSNHOBQCWHVPHSCLFMTK'

const accessTokenVehicle = '2774a998-c274-448d-9f32-6339a8ee1f72'

const chargerSeed = 'DSIOSVMDGLRZUIGOTZHACZGQEJYMMLXSWKTBMIGKXRNW9YIERRRIFKRGQRHCSQP9WTGJGVIRIHQNDEFSE'

const accessTokenCharger = '7db84cd0-9a81-48e0-a89a-7886ef10121d'

class HMVehicle {
  constructor (seed) {
    this.seed = seed
  }

  async initHMCertificate (accessTokenVehicle) {
    this.accessCertificate = await hmkit.downloadAccessCertificate(
      accessTokenVehicle
    )
  }

  async sendTransaction(value, address){

    sendIOTA(this.seed, value, address)
  }


  async startCharging(){

    try{

        await hmkit.telematics.sendCommand(

            this.accessCertificate.getSerial(),
            hmkit.commands.ChargingCommand.startCharging()

        )

    } catch (e){
        console.log(e)
    }


  }

}

class HMCharger {
  constructor (seed) {
    this.seed = seed
  }

  async initHMCertificateCharger (accessTokenCharger) {
    this.accessCertificate = await hmkit.downloadAccessCertificate(
      accessTokenCharger
    )
  }

  async getReceiveAddress(){

    this.currentAddress = generateAddress(this.seed, 0)
    return this.currentAddress

  }

  async prepareForPayment(){

    this.balance = await this.checkBalance()

  }

  async checkBalance() {

    let response = await iota.getBalances([this.currentAddress], 100)

    return response.balances[0]

  }

  async authenticate(){

    try{

        await hmkit.telematics.sendCommand(

            this.accessCertificate.getSerial(),
            hmkit.commands.HomeChargerCommand.authenticate()

        )

    } catch (e){
        console.log(e)
    }

  }

  async checkForPaymentConfirmation (callback){

    try{

        let initialBalance = this.balance
        var currentBalance = 0

        for (var i=0; i < 240; i++){

            currentBalance = await this.checkBalance()

            if(currentBalance > initialBalance){
                await this.authenticate()
                return callback(null)

            }

            await new Promise((resolve) => setTimeout(resolve, 5000))

        }
        return callback('Error : Timeout')

    } catch (e){

        return callback(e)
    }

  }

}

async function app () {
  try {
    // init vehicle object
    var vehicle = new HMVehicle(vehicleSeed)
    await vehicle.initHMCertificate(accessTokenVehicle)
    console.log('Vehicle initialized.')

    // init charger object
    var charger = new HMCharger(chargerSeed)
    await charger.initHMCertificateCharger(accessTokenCharger)

    console.log('Charger initialized.')

    let chargerAddress = await charger.getReceiveAddress()

    console.log(`Charger Address : ${chargerAddress}`)
    console.log('Preparing Payment...')

    await charger.prepareForPayment()

    console.log('Sending Transaction...')
    vehicle.sendTransaction(1, chargerAddress)

    console.log('Checking for payment confirmation...')
    charger.checkForPaymentConfirmation((error) => {
        if(!error){

            console.log('Payment confirmed..!')
            console.log('Starting Charging Process...')

            vehicle.startCharging()
        } else{
            console.log(error)
        }

    })

    }catch (e) {
     console.log(e)
   }
}


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

app()