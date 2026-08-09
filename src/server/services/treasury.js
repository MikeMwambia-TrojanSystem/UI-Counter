/**
 * Server-only. Treasury creation and address/contract checks.
 */
const { validCreate } = require("../validation/treasurySchema.js");
const axios = require("axios");
const config = require("../config/env.js");

const baseURL = `${config.apiBaseUrl}/treasury`;

exports.createTreasury = async function (_url, _data) {
  const valid = await validCreate(_data);

  if (valid === true) {
    let _response = false;

    await axios({
      method: "post",
      url: `${baseURL}/${_url}`,
      headers: { "content-type": "application/json" },
      params: {
        _id: _data._id,
        origin_Address: _data.origin_Address,
        treasury: _data.treasury,
        asset_balance: _data.asset_balance,
      },
      transformRequest: [
        function (data, headers) {
          const serializedData = [];
          for (const k in data) {
            if (data[k]) {
              serializedData.push(`${k}=${encodeURIComponent(data[k])}`);
            }
          }
          return serializedData.join("&");
        },
      ],
    })
      .then((response) => {
        _response = response.data;
      })
      .catch((err) => {
        _response = false;
      });

    return _response;
  }

  return false;
};

// getBalTInEth_ was commented out in the original (marked "Not used ATM").
// Left out here; the working equivalent used elsewhere is
// src/server/services/balance.js's getBalInEth_, exposed via
// /api/get/getBalInEth.

exports.isContract = async function (_address) {
  try {
    // Was a bare relative path `/heartbeat/getCode` with no base URL --
    // on the server (and really even in the browser, since nothing here
    // proxies that path) axios has nothing to resolve it against and this
    // always threw, falling into the catch below. Pointed at the same
    // heartbeat service getBalInEth_ uses, which is the sibling endpoint
    // this was clearly meant to call.
    const response = await axios.get(`${config.heartbeatBaseUrl}/getCode`, {
      params: { address: _address },
    });

    const code = response.data?._code;
    return typeof code === "string" && code === "0x";
  } catch (err) {
    return false;
  }
};
