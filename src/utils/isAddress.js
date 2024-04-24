
const Web3 = require('web3');

// define web3 client
const client = new Web3(new Web3.providers.HttpProvider(
'https://lb.nodies.app/v1/4f717e5dd5614bc88b6d6b915fd0ddc4', 
{
    headers: [{
        name: "eth_nodies",
        value: "746b2118-314e-448d-8ba3-3a53d880ace6"
    }]
})
);

// query for balance
const isAddress = async (address)=> await client.utils.isAddress(address);

export default isAddress;

//Add support for the other 4 chains 
//the above is for eth