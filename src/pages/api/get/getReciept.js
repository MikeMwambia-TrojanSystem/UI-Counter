const axios =require('axios').default;

exports.getReciept = async function(_url=null) {

    const baseURL="http://confirmation.test/payReciept";

    let _response = false;

    await axios({
      method:'get',
      url:`${baseURL}/${_url}`,
      headers:{
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json',
        'Accept': 'application/json'
      }//Remove this pre production
    })
    .then((response)=>{
      _response = response.data;
    })
    .catch((err)=>{
      _response = false;
    });//Update error

    return _response;

};
