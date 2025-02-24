import {Big} from 'big.js';

module.exports = {

//Price in Ksh function takes the $price and dollar rate
//returns a string of the number representing the asset price in Kshs
priceInKshs: async function (dollar_price,dollar_rate){

    try{

        const bg_dollar_price = new Big(`${dollar_price}`);
        const bg_dollar_rate = new Big(`${dollar_rate}`);
        Big.DP = 4;

        const _priceInKshs = bg_dollar_price.times(bg_dollar_rate).toString();
        return _priceInKshs;//Returns string

    }catch(err){
        
        return false;
    };

},


//Takes priceInKshs and Amount both strings
//Returns BG int (wei) that is fed into another function
cryptoAmnt: async function (priceInKshs,amntInKshs){

    try{

        const bg_priceInKshs = new Big(Number(priceInKshs));
        const bg_amntInKshs = new Big(Number(amntInKshs));

        //KSHs per wei
        const oneEthInWei = new Big(10).pow(18);
        const weiPerKshs = oneEthInWei.div(bg_priceInKshs);
        const bg_weiAmnt = weiPerKshs.times(bg_amntInKshs);
        Big.DP = 12;

        return {
            display: bg_weiAmnt.div(oneEthInWei).toString(),
            sign:bg_weiAmnt
        }

       

    }catch(err){
        return false;
    };

},

//Takes rate in dollar rate and price in dollars
//Returns Big Number string (price in Kshs)
balInKshs : async function (_priceInKshs,cryptBal){

    try{
     
        const bg__priceInKshs  = new Big(`${_priceInKshs}`);
        const bg_cryptBal = new Big(`${cryptBal}`);
        const bg_priceInKshs = bg__priceInKshs.times(bg_cryptBal);
        return bg_priceInKshs.toString();

    }catch(err){

        return false;
    };

},

//Checks the maximum buy in Kshs one can purchase
//Takes treasury balance from orders add treasury field in url
maximumBuy : async function (cryptoAmnt,treasury){

    try{

        const wei_cryptoAmnt = new Big(`${cryptoAmnt}`).pow(18);
        const wei_treasury_bal = await getBalance(`${treasury}`)
                                .toString();

        return new Big(wei_treasury_bal).gt(wei_cryptoAmnt);

    }catch(err){
        
        return false;
    };

}
};