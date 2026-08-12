const axios =require('axios').default;

exports.getBalInEth_ = async function(_address) {

    let _response = false;

    await axios({
      method:'get',
      //url:`/heartbeat/getBalance?address=${_address}`
      url:`http://heartbeat.test/heartbeat/getBalance?address=${_address}`
    })
    .then((response)=>{
      let eth5 = response?.data?._balance?.eth;
      _response = eth5;
    })
    .catch((err)=>{
      _response = false;
    });//Update error

    return _response;

};
