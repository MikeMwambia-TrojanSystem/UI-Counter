const Validator = require("fastest-validator");

const v = new Validator({haltOnFirstError: true});

const schemaCreate = {
  _id:{type:"string"},
  dashboardname:{type:"string",min:3,max:50},
  paybill:{type:"number",positive:true,min:0,integer:true},
  dollar_rate:{type:"number",positive:true,min:0,integer:true,max:150000},
  r_t:{type:"string"},
  asset_id:{type:"string",min:1,max:30},
  asset_treasury:{type:"string"},
  origin_Address:{type:"string"},
  maximum_buy_kshs:{type:"number",positive:true,min:0,integer: true,max: 150000},
  minimum_buy_kshs:{type:"number",positive:true,min:0,integer: true,max: 150000},
  orders:{type:"number",min:0,integer:true},
  $$strict: true 
};

const createCheck = v.compile(schemaCreate);

exports.validCreate = async function(data){
  return createCheck(data);
};



const schemaUpdate = {
  id:{type:"string",min:3,max:300},
  dashboardname:{type:"string",min:3,max:50},
  dollar_rate:{type:"number",positive:true,min:0,integer:true,max:150000},
  origin_Address:{type:"string"},
  minimum_buy_kshs:{type:"number",positive:true,min:0,integer: true,max: 150000},
  $$strict: true 
};

const _updateCheck = v.compile(schemaUpdate);

exports.updateCheck = async function(data){
  return _updateCheck(data);
}