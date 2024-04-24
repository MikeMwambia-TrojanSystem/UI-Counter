const Validator = require("fastest-validator");

const v = new Validator({haltOnFirstError: true});

const schemaCreate = {
  dollar_rate:{type:"number",positive:true,min:0,integer:true,max:150000},
  asset_price_usd:{type:"number",positive:true,min:0,integer:true},
  ksh_amnt:{type:"number",nullable:true,default:0,integer:true,max:150000},
  crypto_address:{type:"string",nullable:true,default:'0x2442F0A5Bd476a64baa61641Bb9f5A0bb42EC875'},
  paybill:{type:"number",nullable:true,default:0,integer:true},
  pay_code:{type:"string",nullable:true,default:'No code'},
  status:{type:"boolean"},
  $$strict: true 
};

const createCheck = v.compile(schemaCreate);

exports.validCreate = async function(data){
  return createCheck(data);
};

const schemaUpdate = {
  _id:{type:"string"}
};

const _updateCheck = v.compile(schemaUpdate);

exports.updateCheck = async function(data){
  return _updateCheck(data);
};
