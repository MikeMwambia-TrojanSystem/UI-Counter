/**
 * Server-only. Reads a treasury's ETH balance from the heartbeat backend.
 */
const axios = require("axios").default;
const config = require("../config/env.js");

exports.getBalInEth_ = async function (_address) {
  let _response = false;

  await axios({
    method: "get",
    url: `${config.heartbeatBaseUrl}/getBalance?address=${_address}`,
  })
    .then((response) => {
      const eth5 = response.data?._balance?.eth;
      // Was `.tofixed(4)` -- not a real method (case-sensitive, real one is
      // `.toFixed`), so this always threw at runtime and the caller only
      // ever saw the catch-all `false` below. Fixed as part of moving this
      // to a real server route.
      const returnB = Number(eth5).toFixed(4);
      _response = returnB;
    })
    .catch((err) => {
      _response = false;
    });

  return _response;
};
