//Create asset API
const { validCreate } = require("./schema/assetSchema.js");

const axios =require('axios');

const baseURL="https://api.counter.co.ke";

exports.createAsset = async function(_url,_data) {

  const valid = await validCreate(_data);

  if(valid === true){

    let _response = false;

    await axios({
      method:'post',
      url:`${baseURL}/${_url}`,
      data :{
        dollar_price:_data.dollar_price,
        _id:_data._id,
        min_buy_dollar:_data.min_buy_dollar,
        r_t:_data.r_t,
        status:_data.status
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

