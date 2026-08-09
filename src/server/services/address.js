/**
 * Server-only. Talks to the address/wallet-history backend and Moralis.
 * Only ever import this from src/pages/api/** route handlers.
 */
const axios = require("axios");
const Moralis = require("moralis");
const config = require("../config/env.js");

exports.isAddress = async function (_url = null) {
  let _response = false;

  await axios({
    method: "get",
    url: `${config.addressServiceBaseUrl}/${_url}`,
  })
    .then((response) => {
      _response = response;
    })
    .catch((err) => {
      _response = false;
    });

  return _response;
};

exports.getBalInEth = async function (_url = null, _data = null) {
  let _response = false;

  await axios({
    method: "post",
    url: `${config.addressServiceBaseUrl}/${_url}`,
    data: _data,
  })
    .then((response) => {
      _response = response.data;
    })
    .catch((err) => {
      _response = false;
    });

  return _response;
};

let moralisStarted = false;

exports.getWalletHistory = async function (_address) {
  const timeNowInSeconds = Math.round(Date.now() / 1000);
  const oneWeekAgo = Math.round(timeNowInSeconds - 604800);

  try {
    if (!config.moralisApiKey) {
      return false;
    }

    if (!moralisStarted) {
      await Moralis.start({ apiKey: config.moralisApiKey });
      moralisStarted = true;
    }

    const response = await Moralis.EvmApi.wallets.getWalletHistory({
      chain: "0x1",
      order: "DESC",
      limit: 10,
      fromDate: `${oneWeekAgo}`,
      toDate: `${timeNowInSeconds}`,
      address: `${_address}`,
    });

    return response;
  } catch (e) {
    return false;
  }
};
