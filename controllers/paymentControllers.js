
const express = require('express'); 
const asyncHandler = require('express-async-handler');
const app = express();





/**
 *@desc    HTTP POST  
 *@route   HTTP POST /fees
 *@access  Public
 */

const feeConfig =asyncHandler(async(req, res) => {
console.log("here")
  const {FeeConfigurationSpec} = req.body;
  try {
    
let feeConfig =FeeConfigurationSpec.split('\n').map((item)=> {
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

console.log(feeConfig);

res.status(200).json({
  "status": "ok"
})


  }catch(err) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    })

  }
})



module.exports = {feeConfig}
 