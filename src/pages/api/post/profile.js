
const { validCreate } = require("./schema/profileSchema.js");

const axios =require('axios');

const API_BASE = '/api/profile';

exports.createProfile = async function(_url,_data) {

  const valid = await validCreate(_data);

  if(valid === true){

    let _response = false;

    const url = `${API_BASE}/${_url}`;

    await axios({
      method:'post',
      url:url,
      headers: {
          'content-type': 'application/json'
      },
      params :{
        dollar_rate:_data.dollar_rate,
        name:_data.name,
        paybill:_data.paybill,
        unique_link:_data.unique_link,
        minimum_buy_kshs:_data.minimum_buy_kshs,
        maximum_buy_kshs:_data.maximum_buy_kshs,
        status:_data.status,
        r_t:_data.r_t
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
      if(true===response.data.creation){
         _response = response.data;
      }else{
        _response = false;
      };
    })
    .catch((err)=>{
      _response = false;
    });

    return _response;
    
  }

  return false;

}

