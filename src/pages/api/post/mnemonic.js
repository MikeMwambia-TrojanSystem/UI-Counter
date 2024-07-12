//Create asset API
const { validCreate } = require("./schema/mnemonicSchema.js");

const axios =require('axios');

exports.genAddress = async function(_url,_data) {

  const valid = await validCreate(_data);

  if(valid === true){

    const baseURL="http://127.0.0.1:3700/gen/v1/wallet";

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

