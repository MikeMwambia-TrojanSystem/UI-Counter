//Create asset API
const { validCreate } = require("./schema/treasurySchema.js");

const axios =require('axios');

const baseURL= "/api/treasury";
//"http://api.test/api/treasury";


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

/*
Consumed only by dashboard page
Gets balance form couchdb not blockchain
Not used ATM


exports.getBalTInEth_ = async function(_address) {

    let _response = false;

    await axios({
      method:'post',
      url:`${baseURL}/checkTBal`,
      headers: {
          'content-type': 'application/json'
      },
      params :{
        address:_address
      },
      transformRequest: [
        function(data, headers) {
          const serializedData = []

          for (const k in data) {
            if (data[k]) {
              serializedData.push(`${k}=${encodeURIComponent(data[k])}`)
            }
          }

          return serializedData;
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

};
*/


exports.isContract = async function(_address) {
    try {
        const response = await axios.get('http://heartbeat.test/heartbeat/getCode', {
            params: { address: _address }
        });
        
        // If the response has a '_code' field, check if it's not '0x'
        const code = response.data?._code;

        // Return true if code exists, is a string, and is '0x'
        return typeof code === 'string' && code === '0x';
    } catch (err) {

        // On any error, treat as false
        return false;
    }
};