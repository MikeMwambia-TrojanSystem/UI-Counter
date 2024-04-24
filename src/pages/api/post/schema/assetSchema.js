const Validator = require("fastest-validator");

const v = new Validator({haltOnFirstError: true});

const schemaCreate = {
  dollar_price:{type:"number",default: 0},
  r_t:{type:"number",positive:true,min:0,integer: true},
  status:{type:"boolean"},
  _id:{type:"string"},
  min_buy_dollar:{type:"number",positive:true,min:0,integer:true},
  $$strict: true 
};

const createCheck = v.compile(schemaCreate);

exports.validCreate = async function(data){
  return createCheck(data);
};


