const {Web3} = require("web3");

const POCKET_URL = "https://eth-mainnet.rpc.grove.city/v1/6fe16bdc66e8cac1bdb01008";

const provider = new Web3(POCKET_URL)

exports.isAddress = async function (address){

    try{
        let isAdd = await provider.utils.isAddress(`${address}`);
        return isAdd;

    }catch(err){
        
        return false;
    };

};
