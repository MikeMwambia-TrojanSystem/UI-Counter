const {Web3} = require("web3");

const POCKET_URL = "https://eth-mainnet.rpc.grove.city/v1/6fe16bdc66e8cac1bdb01008";

const provider = new Web3(POCKET_URL)

const {isAddress} = require('./isAddress.js');

exports.balance = async function (address){

    try{

        let isValid = isAddress(address);

        if(!isValid) return false;
        
        let bal = await provider.eth.getBalance(address);
        let ether = await provider.utils.fromWei(`${bal}`,'ether');
        return ether;

    }catch(err){

        return false;
    };

};
