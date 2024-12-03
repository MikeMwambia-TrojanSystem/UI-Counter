//Create asset API
const { validCreate } = require("./schema/assetSchema.js");

const axios =require('axios');

//const baseURL="https://api.counter.co.ke";
const baseURL="https://couchservice.loca.lt/atthemoment/v1/counter/";

exports.createAsset = async function(_url,_data) {

  const valid = await validCreate(_data);

  if(valid === true){

    let _response = false;

    await axios({
      method:'post',
      url:`${baseURL}/${_url}`,
      data :{
        _id:_data._id,
        name:_data.name
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

