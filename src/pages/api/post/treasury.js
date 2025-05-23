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


exports.getBalInEth_ = async function(_address) {

    let _response = false;

    await axios({
      method:'post',
      url:`${baseURL}/checkAddressBal`,
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

/*
Consumed only by dashboard page
Gets balance form couchdb not blockchain
*/

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



exports.isAddressValid = async function(_address) {

    let _response = false;

    await axios({
      method:'post',
      url:`${baseURL}/checkAddrss`,
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