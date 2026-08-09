/**
 * Server-only. Looks up an M-Pesa payment receipt/confirmation.
 */
const axios = require("axios").default;
const config = require("../config/env.js");

exports.getReciept = async function (_url = null) {
  let _response = false;

  await axios({
    method: "get",
    url: `${config.confirmationBaseUrl}/${_url}`,
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => {
      _response = response.data;
    })
    .catch((err) => {
      _response = false;
    });

  return _response;
};
