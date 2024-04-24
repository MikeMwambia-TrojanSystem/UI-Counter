const Validator = require("fastest-validator");

const v = new Validator({haltOnFirstError: true});

const schemaCreate = {
  name:{type:"string",min:3,max:30},
  unique_link:{type:"string",min:3,max:30},
  dollar_rate:{type:"number",positive:true,min:0,integer: true,max: 150000},
  minimum_buy_kshs:{type:"number",positive:true,min:0,integer: true,max: 150000},
  maximum_buy_kshs:{type:"number",positive:true,min:0,integer: true,max: 150000},
  status:{type:"boolean"},
  paybill:{type:"number",positive:true,min:0,integer:true},
  r_t:{type:"number",positive:true,min:0,integer: true},
  $$strict: true 
};

const createCheck = v.compile(schemaCreate);

exports.validCreate = async function(data){
  const status_ = await createCheck(data);
  return status_;
};