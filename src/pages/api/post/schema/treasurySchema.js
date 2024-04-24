const Validator = require("fastest-validator");

const v = new Validator({haltOnFirstError: true});

const schemaCreate = {
  r_i:{type:"string"},
  r_t:{type:"number",positive:true,min:0,integer: true},
  origin_Address:{type:"string"},
  treasury:{type:"string"},
  asset_balance:{type:"number"},
  asset_id:{type:"string"},
  $$strict: true 
};

const createCheck = v.compile(schemaCreate);

exports.validCreate = async function(data){
  return createCheck(data);
};


