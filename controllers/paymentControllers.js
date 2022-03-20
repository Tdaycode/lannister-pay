
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
    await client.set('foo', JSON.stringify(feeConfig));


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

const transactFee = asyncHandler(async (req, res) => {

  try {
    const value =  await client.get('foo')
    console.log(JSON.parse(value))
    res.send(JSON.parse(value))
    
  }catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    })

  }

})



module.exports = {feeConfig, transactFee}
 