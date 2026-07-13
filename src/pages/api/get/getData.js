const axios =require('axios');

exports.getData = async function(_url=null) {

    const baseURL= "http://apicontainer:3200/api/";

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

