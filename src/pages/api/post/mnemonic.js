//Create asset API
const { validCreate } = require("./schema/mnemonicSchema.js");

const axios =require('axios');

//const baseURL= "/wallet"; 
const baseURL= "http://generator.test/wallet";

exports.genAddress = async function(_url,_data) {

  const valid = await validCreate(_data);

  if(valid === true){

    let _response = false;

    await axios({
      method:'post',
      headers: {
          'content-type': 'application/json'
      },
      url:`${baseURL}/${_url}`,
      params :_data,
      transformRequest: [
        function(data, headers) {
          const serializedData = []

          for (const k in data) {
            if (data[k]) {
              serializedData.push(`${k}=${encodeURIComponent(data[k])}`)
            }
          }

          return serializedData.join('&')
        }
      ]
    })
    .then((response)=>{
      console.log(response);
      _response = response.data;
    })
    .catch((err)=>{
      console.log(err);
      _response = false;
    });//Update error

    return _response
    
  }

  return false;

}

