//addressUtills
const {Web3} = require("web3");

const POCKET_URL = "https://eth-mainnet.rpc.grove.city/v1/6fe16bdc66e8cac1bdb01008";

const provider = new Web3(POCKET_URL)


exports.balInWei = async function (address){

    try{

        return await provider.eth.getBalance(address);
        
    }catch(err){

        return false;
    };
};


exports.balInEth = async function (address) {

    try {
        const bal_Wei = await provider.eth.getBalance(address);
        return await provider.utils.fromWei(`${bal_Wei}`,'ether');

    }catch(err){

        return false;
    }; 

};

//Takes srting number as wei value
exports.valInEth = async function (number) {

    try {
        
        return await provider.utils.fromWei(`${number}`,'ether');

    }catch(err){

        return false;
    }; 

};


//let isSmartContract = await provider.eth.getCode(`${address}`);
//console.log(isSmartContract);
//Add code to detect wheter the address entered is a smart contract
exports.isAddress = async function (address){

    try{

        let isAdd = await provider.utils.isAddress(`${address}`);
        return isAdd;

    }catch(err){

        return false;
    };

};