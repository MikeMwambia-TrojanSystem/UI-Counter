const axios =require('axios');
const bip39 = require('bip39');
const Moralis = require('moralis');

exports.getData = async function(_url=null) {

    //const baseURL="https://api.counter.co.ke";
    const baseURL="https://couchservice.loca.lt/atthemoment/v1/counter";

    let _response = false;

    await axios({
      method:'get',
      url:`${baseURL}/${_url}`,
      headers:{'Access-Control-Allow-Origin': '*'}//Remove this pre production
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

exports.getWalletHistory = async function(_address){

  console.log(_address);
  
  const timeNowInSeconds = Math.round(Date.now()/1000);
  const oneWeekAgo = Math.round(timeNowInSeconds - 604800);

try {

  await Moralis.start({
    apiKey: process.env.moralis_api_key
  });

  const response = await Moralis.EvmApi.wallets.getWalletHistory({
    "chain": "0x1",
    "order": "DESC",
    "limit": 10,
    "fromDate": `${oneWeekAgo}`,
    "toDate": `${timeNowInSeconds}`,
    "address": `${_address}`
  });

  console.log(response);
  return response;

} catch (e) {

  console.error(e);

};

};

