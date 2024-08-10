const axios =require('axios');

exports.getPrice = async function(_url=null) {

    const baseURL="https://data-api.binance.vision";

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
