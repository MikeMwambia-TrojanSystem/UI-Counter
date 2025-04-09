//Create asset API
const { validCreate,order_1Check,order_2Check } = require("./schema/orderSchema.js");

const axios =require('axios');

const baseURL="https://api.counter.co.ke";

exports.createOrder = async function(_url,_data) {

  const valid = await validCreate(_data);

  if(valid === true){

    let _response = false;

    await axios({
      method:'post',
      headers: {
          'content-type': 'application/json'
      },
      url:`${baseURL}/${_url}`,
      params :_data,
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
    });

    return _response
    
  }

  return false;

}


exports.updateOrder = async function(_url,_data) {

const form = _data.form;

switch(form){

case 'order_1':

    const order1Update = order_1Check(_data);
    if(order1Update){
      let response = await updateData(_url,_data);
      return response;
    }
    return false;

  break;

case 'order_2':

    const order2Update = order_2Check(_data);
    if(order2Update){
      let response = await updateData(_url,_data);
      return response;
    }
    return false;

  break;

default : return false;
  break;

}

    async function updateData(_url,data){
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
            console.log(err);
            _response = false;
          });

          return _response
    }

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

