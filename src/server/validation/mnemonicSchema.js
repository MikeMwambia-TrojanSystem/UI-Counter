const Validator = require("fastest-validator");

const v = new Validator({haltOnFirstError: true});

const schemaCreate = {
  phrase:{type:"string"},
  chainID:{type:"string"},
  $$strict: true 
};

const createCheck = v.compile(schemaCreate);

exports.validCreate = async function(data){
  return createCheck(data);
};


