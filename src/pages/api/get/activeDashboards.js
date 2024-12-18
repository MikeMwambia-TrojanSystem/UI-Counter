const axios =require('axios');
const { getPrice } = require("./getPrice.js");
const { getBalInEth } - require("./addressUtils.js");
const { priceInKshs,balInKshs } = require("../utils/ui_utills.js");


//Takes unique url
exports.generateActiveDashboards = async function() {

  let api = 'https://api.counter.co.ke/getActiveDashboards'

  await axios
  .get(api)
  .then(response => {
    return (response.length>0)?addPrice(response):[];
  }).catch(error => false);

};

async function addPrice(docs){

  let pricedDashboards = [];

  try {

    let price = await getPrice('api/v3/ticker/price?symbol=ETHUSDT');
    let dollar_price = price.price;

    docs.forEach((doc)=>{

      let Kshs_price = await priceInKshs(dollar_price,doc.dollar_rate);

      const dashboardA = {
          id: doc.id,
          dashboardname: doc.dashboardname,
          dollar_rate: doc.dollar_rate,
          creationTime: doc.creationTime,
          expiryTime: doc.expiryTime,
          asset_treasury: doc.asset_treasury,
          minimum_buy_kshs: doc.minimum_buy_kshs,
          dollar_price:dollar_price,
          Kshs_price:Kshs_price
      };

      const dashboardAD = JSON.parse(JSON.stringify(dashboardA));
      pricedDashboards.push(dashboardAD);

    });

    return addCryptoBal(pricedDashboards);

  }catch(err){
    console.log(err);
    return false;
  };

};

async function addCryptoBal(docs){

  let addedCryptoBal = [];

  try {

    docs.forEach((doc)=>{

      let treasuryBal = await getBalInEth('balAddress',{address:doc.address,form:'ether'});
      let balInKshs = await balInKshs(doc.Kshs_price,treasuryBal);

      const dashboardCrypted = {
          id: doc.id,
          dashboardname: doc.dashboardname,
          dollar_rate: doc.dollar_rate,
          creationTime: doc.creationTime,
          expiryTime: doc.expiryTime,
          asset_treasury: treasuryBal,
          minimum_buy_kshs: doc.minimum_buy_kshs,
          maximum_buy_kshs: balInKshs||150000,
          dollar_price:doc.dollar_price,
          Kshs_price:doc.Kshs_price
      };

      const dashboardCrypto = JSON.parse(JSON.stringify(dashboardCrypted));
      addedCryptoBal.push(dashboardCrypto);

    });

    return addedCryptoBal;

  }catch(err){
    console.log(err);
    return false;
  }

};


