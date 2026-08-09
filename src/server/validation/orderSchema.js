const Validator = require("fastest-validator");

const v = new Validator({haltOnFirstError: true});

const schemaCreate = {
  order_timestamp:{type:"string"},//order creation time
  Kshs_price:{type:"number",default:0,integer:true},
  status:{type:"boolean"},
  dashboardId:{type:"string"},
  asset_treasury:{type:"string"},
  minimum_buy_kshs:{type:"number",positive:true,min:0,integer: true,max: 150000},
  $$strict: true 
};

const createCheck = v.compile(schemaCreate);

exports.validCreate = async function(data){
  return createCheck(data);
};


const order_1Update = {
  _id:{type:"string"},
  form:{type:"string"},
  crypto_amnt:{type:"string",default:'0'},//Big Int String wei value-- Add this
  ksh_amnt:{type:"number",default:0,integer:true,max:150000},
  $$strict: true 
};

// Was `return v.compile(order_1Update);` -- that recompiles the schema and
// hands back the compiled *validator function itself* without ever running
// it against `data`. A function reference is always truthy, so every
// caller's `if (order_1Check(...))` passed unconditionally no matter what
// was submitted -- order_1 updates were effectively unvalidated. Compiling
// once at module load and invoking the compiled check against `data` is
// what every other export in this file already does (see
// validCreate/updateCheck/codeCheck).
const _order1Check = v.compile(order_1Update);

exports.order_1Check = async function(data){
  return _order1Check(data);
};


const order_2Update = {
  _id:{type:"string"},
  form:{type:"string"},
  crypto_address:{type:"string",nullable:true,
  default:'0x2442F0A5Bd476a64baa61641Bb9f5A0bb42EC875'},
  $$strict: true 
};

// Same bug as order_1Check above, same fix.
const _order2Check = v.compile(order_2Update);

exports.order_2Check = async function(data){
  return _order2Check(data);
};



const schemaUpdate = {
  _id:{type:"string"}
};

const _updateCheck = v.compile(schemaUpdate);

exports.updateCheck = async function(data){
  return _updateCheck(data);
};


const schemaPayCode = {
  pay_code:{type:"string"}
};

const _codeCheck = v.compile(schemaPayCode);

exports.codeCheck = async function(data){
  return _codeCheck(data);
};
