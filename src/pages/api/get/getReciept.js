const axios =require('axios');

exports.getReciept = async function(_url=null) {

    const baseURL="http://0.0.0.0:4050/reciept/v1/redeem";

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
