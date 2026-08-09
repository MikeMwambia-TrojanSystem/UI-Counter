const Validator = require("fastest-validator");

const v = new Validator({haltOnFirstError: true});

const schemaCreate = {
  origin_Address:{type:"string"},
  treasury:{type:"string"},
  asset_balance:{type:"number"},
  _id:{type:"string"},
  $$strict: true 
};

const createCheck = v.compile(schemaCreate);

exports.validCreate = async function(data){
  return createCheck(data);
};

