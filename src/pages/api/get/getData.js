const axios =require('axios');
const bip39 = require('bip39');

exports.getData = async function(_url=null) {

    const baseURL="http://127.0.0.1:3500/atthemoment/v1/counter";

    let _response = false;

    await axios({
      method:'get',
      url:`${baseURL}/${_url}`
    })
    .then((response)=>{
      _response = response.data;
    })
    .catch((err)=>{
      _response = false;
    });//Update error

    return _response;

};


exports.getMnemonic = async function(){

  return bip39.generateMnemonic();

};


