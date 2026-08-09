/**
 * Server-only. Proxies Binance's public price ticker.
 *
 * Binance's endpoint itself needs no secret and no auth, but every user's
 * browser hitting it directly means Binance sees every visitor's IP and the
 * app has zero control if Binance starts throttling/blocking. Proxying
 * server-side is about reliability/consistency, not a secret-exposure fix.
 */
const axios = require("axios");
const config = require("../config/env.js");

exports.getPrice = async function (_url = null) {
  let _response = false;

  await axios({
    method: "get",
    url: `${config.binanceBaseUrl}/${_url}`,
  })
    .then((response) => {
      _response = response.data;
    })
    .catch((err) => {
      _response = false;
    });

  return _response;
};
