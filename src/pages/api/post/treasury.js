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
      headers: {
          'content-type': 'application/json'
      },
      params :{
        _id:_data._id,
        origin_Address:_data.origin_Address,
        treasury:_data.treasury,
        asset_balance:_data.asset_balance
      },
      transformRequest: [
        function(data, headers) {
          const serializedData = []

          for (const k in data) {
            if (data[k]) {
              serializedData.push(`${k}=${encodeURIComponent(data[k])}`)
            }
          }

          return serializedData.join('&')
        }
      ]
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
