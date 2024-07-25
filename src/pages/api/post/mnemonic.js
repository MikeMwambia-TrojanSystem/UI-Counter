//Create asset API
const { validCreate } = require("./schema/mnemonicSchema.js");

const axios =require('axios');

const baseURL="http://34.172.249.132/atthemoment/v1/counter/";

exports.genAddress = async function(_url,_data) {

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

