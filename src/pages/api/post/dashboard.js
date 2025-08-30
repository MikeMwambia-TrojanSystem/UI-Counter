const { validCreate,updateCheck } = require("./schema/dashboardSchema.js");

const axios =require('axios');

const baseURL="https://api.counter.co.ke";


exports.createDashboard = async function(_url,_data) {

  const valid = await validCreate(_data);

  if(valid === true){

    let _response = false;

    await axios({
      method:'post',
      headers: {
          'content-type': 'application/json'
      },
      url:`${baseURL}/${_url}`,
      params :{
        _id:_data._id,
        dashboardname:_data.dashboardname,
        paybill:_data.paybill,
        dollar_rate:_data.dollar_rate,
        r_t:_data.r_t,
        loaded:_data.loaded,
        asset_name:_data.asset_id,
        asset_treasury:_data.asset_treasury,
        origin_Address:_data.origin_Address,
        maximum_buy_kshs:_data.maximum_buy_kshs,
        minimum_buy_kshs:_data.minimum_buy_kshs,
        orders:_data.orders
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
    
  };


  return false;

};


exports.updateDashboard = async function(_url,_data){

  const valid = await updateCheck(_data);

  if(valid === true){

    let _response = false;

    await axios({
      method:'PUT',
      url:`${baseURL}/${_url}`,
      data :{
        id:_data.id,
        dashboardname:_data.dashboardname,
        dollar_rate:Number(_data.dollar_rate),
        origin_Address:_data.origin_Address,
        minimum_buy_kshs:Number(_data.minimum_buy_kshs)
      }
    })
    .then((response)=>{
      _response = response.data;
    })
    .catch((err)=>{
      _response = false;
    });//Update error

    return _response

  };

  return false;

};

exports.withdrawDashboard = async function(_url,_id){

    let _response = false;

    await axios({
      method:'post',
      url:`${baseURL}/${_url}`,
      data :{
        id:_id
      }
    })
    .then((response)=>{
      _response = response.data;
    })
    .catch((err)=>{
      _response = false;
    });//Update error

    return _response;
};


exports.deleteDashboard = async function(_url,_id){

    let _response = false;

    await axios({
      method:'post',
      url:`${baseURL}/${_url}`,
      data :{
        id:_id
      }
    })
    .then((response)=>{
      _response = response.data;
    })
    .catch((err)=>{
      _response = false;
    });//Update error

    return _response;
};


