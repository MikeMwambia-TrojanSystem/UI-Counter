const axios =require('axios');
const bip39 = require('bip39');
const Moralis = require('moralis');

exports.isAddress = async function(_url=null) {

    const baseURL="https://ethereum.counter.co.ke";

    let _response = false;

    //@ToDo 
    //customize headers across the entire stack 4 prod
    await axios({
      method:'get',
      url:`${baseURL}/${_url}`,
      headers:{'Access-Control-Allow-Origin': '*'}//Remove this pre production
    })
    .then((response)=>{
      _response = response;
    })
    .catch((err)=>{
      console.log(err);
      _response = false;
    });

    return _response;

};



exports.getMnemonic = async function(){

  return bip39.generateMnemonic();

};



exports.balInWei = async function (address){

    try{

        return await provider.eth.getBalance(address);
        
    }catch(err){
        console.log(err);
        return false;
    };
};



exports.balInEth = async function (address) {

    try {
        const bal_Wei = await provider.eth.getBalance(address);
        return await provider.utils.fromWei(`${bal_Wei}`,'ether');

    }catch(err){

        return false;
    }; 

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

