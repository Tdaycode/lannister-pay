
const express = require('express'); 
const asyncHandler = require('express-async-handler');
const app = express();

const Redis = require("ioredis");

let client = new Redis("redis://:f7f3925ea2da45619f1826c5dd0b7c77@global-exciting-squirrel-32209.upstash.io:32209");



/**
 *@desc    HTTP POST  
 *@route   HTTP POST /fees
 *@access  Public
 */

const feeConfig =asyncHandler(async(req, res) => {
console.log("here")
  const {FeeConfigurationSpec} = req.body;
  try {
    if(!FeeConfigurationSpec) res.status(403).send("FeeConfiguration is required");
    
    let feeConfig = FeeConfigurationSpec.split('\n').map((item)=> {
    let feeItem = item.split(' ');
    let FEE_ID = feeItem[0]
  return {

      [FEE_ID]:{

      FEE_CURRENCY:feeItem[1], 
      FEE_LOCALE: feeItem[2],
      FEE_ENTITY: feeItem[3],
      FEE_TYPE: feeItem[6],
      FEE_VALUE: feeItem[7]

      }
  }
})

    feeConfig = Object.assign({},...feeConfig)
    await client.set('feeConfig', JSON.stringify(feeConfig));


    res.status(200).json({
      "status": "ok"
   })


  }catch(err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    })

  }
})

/**
 *@desc    HTTP POST  
 *@route   HTTP POST /compute-transaction-fee
 *@access  Public
 */

const transactFee = asyncHandler(async (req, res) => {
  feeConfig = {
    LNPY1221: {
      FEE_CURRENCY: 'NGN',
      FEE_LOCALE: '*',
      FEE_ENTITY: '*(*)',
      FEE_TYPE: 'PERC',
      FEE_VALUE: '1.4'
    },
    LNPY1222: {
      FEE_CURRENCY: 'NGN',
      FEE_LOCALE: 'INTL',
      FEE_ENTITY: 'CREDIT-CARD(VISA)',
      FEE_TYPE: 'PERC',
      FEE_VALUE: '5.0'
    },
    LNPY1223: {
      FEE_CURRENCY: 'NGN',
      FEE_LOCALE: 'LOCL',
      FEE_ENTITY: 'CREDIT-CARD(*)',
      FEE_TYPE: 'FLAT_PERC',
      FEE_VALUE: '50:1.4'
    },
    LNPY1224: {
      FEE_CURRENCY: 'NGN',
      FEE_LOCALE: '*',
      FEE_ENTITY: 'BANK-ACCOUNT(*)',
      FEE_TYPE: 'FLAT',
      FEE_VALUE: '100'
    },
    LNPY1225: {
      FEE_CURRENCY: 'NGN',
      FEE_LOCALE: '*',
      FEE_ENTITY: 'USSD(MTN)',
      FEE_TYPE: 'PERC',
      FEE_VALUE: '0.55'
    }
  }

  try {
    const {ID, Amount, Currency, CurrencyCountry, Customer, PaymentEntity} = req.body;
    if(!Amount) res.status(403).send('Amount cannot be negative');
    let feeConfig =  await client.get('feeConfig')
    feeConfig = JSON.parse(feeConfig)
    const keys = Object.keys(feeConfig)
    console.log(keys)
    keys.forEach((key, index) => {
      let feeValue = feeConfig[key].FEE_VALUE;
      console.log(typeof parseInt(feeCur))
    });
    
    console.log(feeConfig)
  }catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    })

  }

})



module.exports = {feeConfig, transactFee}
 