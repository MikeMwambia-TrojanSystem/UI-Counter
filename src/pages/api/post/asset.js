//Create asset API
const { validCreate } = require("./schema/assetSchema.js");

const axios =require('axios');

//const baseURL= "/api/asset";
const baseURL= "http://api.test/api/asset";

exports.createAsset = async function(_url,_data) {

  const valid = await validCreate(_data);
  
  if(valid === true){

    let _response = false;

    await axios({
      method:'post',
      url:`${baseURL}/${_url}`,
      headers: {
          'content-type': 'application/json'
      },
      params :{
        _id:_data._id,
        name:_data.name
      },
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
      _response = response.data;
    })
    .catch((err)=>{
      _response = false;
    });//Update error

    return _response
    
  }


  return false;

}

