//Create asset API
const { validCreate,updateCheck,codeCheck } = require("./schema/orderSchema.js");

const axios =require('axios');

const baseURL="https://api.counter.co.ke";

exports.createOrder = async function(_url,_data) {

  const valid = await validCreate(_data);

  if(valid === true){

    let _response = false;

    await axios({
      method:'post',
      url:`${baseURL}/${_url}`,
      data :_data
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


exports.updateOrder = async function(_url,_data) {

let data = {};

const fields = ["_id","ksh_amnt",
  "crypto_address","paybill","pay_code","status","crypto_amnt"];


for(item of fields) {

  if(_data[item]) data[item] = _data[item];
  
}

const valid = await updateCheck(data);
console.log(valid);
if(valid === true){

  const baseURL="http://34.172.249.132/atthemoment/v1/counter";

  let _response = false;

  await axios({
    method:'post',
    url:`${baseURL}/${_url}`,
    data :data
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

exports.verifyCode = async function(_url,data) {

  const valid = await codeCheck(data);

  if(valid === true){

  const baseURL="http://34.172.249.132/atthemoment/v1/counter";

  let _response = false;

  await axios({
    method:'post',
    url:`${baseURL}/${_url}`,
    data :data
  })
  .then((response)=>{
    _response = response.data;
  })
  .catch((err)=>{
    _response = false;
  });

  return _response

  }

  return false;

};

