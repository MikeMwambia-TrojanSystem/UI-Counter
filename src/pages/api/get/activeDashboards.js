
const axios =require('axios');
const { getPrice } = require("./getPrice.js");
const { getBalInEth } = require("./addressUtils.js");
const { priceInKshs,balInKshs } = require("./priceUtills.js");

//Takes unique url
exports.generateActiveDashboards = async function() {

  let api = 'https://api.counter.co.ke/getActiveDashboards'

  return await axios
  .get(api)
  .then(async (response) => {
    return (response.data.length>0)?addPrice(response.data):[];
  }).catch(error => false);

};


async function addPrice(docs){

  let pricedDashboards = [];

  try {

    let price = await getPrice('api/v3/ticker/price?symbol=ETHUSDT');
    let dollar_price = price.price;

    docs.forEach(async (doc)=>{

      let Kshs_price = await priceInKshs(dollar_price,doc.dollar_rate);

      let treasuryBal = await getBalInEth('balAddress',{address:doc.asset_treasury,form:'ether'});

      let balInKshs_ = await balInKshs(Kshs_price,treasuryBal);

      const dashboardA = {
          id: doc.id,
          dashboardname: doc.dashboardname,
          dollar_rate: doc.dollar_rate,
          creationTime: doc.creationTime,
          expiryTime: doc.expiryTime,
          asset_treasury: treasuryBal,
          available:balInKshs_,
          minimum_buy_kshs: (balInKshs_>0)?( (balInKshs_>doc.minimum_buy_kshs)?doc.minimum_buy_kshs:balInKshs_):0,
          maximum_buy_kshs: (150000>balInKshs_)?balInKshs_:150000,
          dollar_price:dollar_price,
          Kshs_price:Kshs_price
      };

      const dashboardAD = JSON.parse(JSON.stringify(dashboardA));
      pricedDashboards.push(dashboardAD);
    });

    return pricedDashboards;

  }catch(err){
    return false;
  };

};

