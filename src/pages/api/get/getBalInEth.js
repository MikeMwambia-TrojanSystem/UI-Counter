const axios =require('axios').default;

exports.getBalInEth_ = async function(_address) {

    let _response = false;

    await axios({
      method:'get',
      //url:`/heartbeat/getBalance?address=${_address}`
      url:`http://heartbeat.test/heartbeat/getBalance?address=${_address}`
    })
    .then((response)=>{
      let eth5 = response.data?._balance?.eth;
      let returnB = Number(eth5).tofixed(4);
      console.log(returnB);
      console.log(999999);
      console.log(eth5);
      _response = returnB;
    })
    .catch((err)=>{
      _response = false;
    });//Update error

    return _response;

};
