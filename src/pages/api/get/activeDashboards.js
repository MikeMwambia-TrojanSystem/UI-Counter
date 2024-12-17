const axios =require('axios');

//Takes unique url
exports.generateActiveDashboards = async function(_url=null) {

  let _activeDashbaords = [];

  await axios
  .get('getActiveDashboardsFromCouchService')
  .then(response => {
    _activeDashbaords.push(response);
  }).catch(error => _activeDashbaords);

};



//Dashboards queried
exports.indActiveDashboards = async function(_dashboard=null) {

  let response = {};

  await axios
  .get('priceFromBinance')
  .then(response => {
    //Calculate asset price in Kshs from response
    //Get asset address balance
    return axios.get('getCryptoBalance');
  })
  .then(response => {
    //Calculate asset address balance in Kshs
    //set the maximum buy from above
    return response;

  }).catch(error => response);

};

