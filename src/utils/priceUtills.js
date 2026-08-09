/**
 * Pure price/decimal math (Big.js). No network calls, nothing secret --
 * safe to run in the browser. Moved out of src/pages/api/get/ where the
 * "api" naming implied a network call that never actually happened here.
 */
import { Big } from "big.js";

module.exports = {
  priceInKshs: async function (dollar_price, dollar_rate) {
    try {
      const bg_dollar_price = new Big(`${dollar_price}`);
      const bg_dollar_rate = new Big(`${dollar_rate}`);
      Big.DP = 4;

      const _priceInKshs = bg_dollar_price.times(bg_dollar_rate).toString();
      return _priceInKshs; //Returns string
    } catch (err) {
      return false;
    }
  },

  balInKshs: async function (_priceInKshs, cryptBal) {
    try {
      if (cryptBal > 0) {
        const bg__priceInKshs = new Big(`${_priceInKshs}`);
        const bg_cryptBal = new Big(`${cryptBal}`);
        const bg_priceInKshs = bg__priceInKshs.times(bg_cryptBal);
        return bg_priceInKshs.toString();
      } else {
        return 0;
      }
    } catch (err) {
      return false;
    }
  },
};
