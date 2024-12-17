//Create asset API
const { validCreate } = require("./schema/treasurySchema.js");

const axios =require('axios');

const baseURL="https://api.counter.co.ke";

exports.createTreasury = async function(_url,_data) {

  const valid = await validCreate(_data);

  if(valid === true){

    let _response = false;

    await axios({
      method:'post',
      url:`${baseURL}/${_url}`,
      data :{
        _id:_data._id,
        origin_Address:_data.origin_Address,
        treasury:_data.treasury,
        asset_balance:_data.asset_balance
      }
    })
    .then((response)=>{
      _response = response.data;
    })
    .catch((err)=>{
      _response = false;
    });//Update error

    return _response
    
  }

  return false;

}
