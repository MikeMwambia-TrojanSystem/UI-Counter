const axios =require('axios');

exports.getData = async function(_url=null) {

    const baseURL="https://api.counter.co.ke";

    let _response = false;

    await axios({
      method:'get',
      url:`${baseURL}/${_url}`,
      headers:{'Access-Control-Allow-Origin': '*'}//Remove this pre production
    })
    .then((response)=>{;
      _response = response.data;
    })
    .catch((err)=>{
      _response = false;
    });//Update error

    return _response;

};

