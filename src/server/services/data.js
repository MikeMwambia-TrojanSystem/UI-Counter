/**
 * Server-only. Generic read against the backend API (dashboards, profiles,
 * treasuries -- resource type is selected by the caller via `_url`).
 */
const axios = require("axios");
const config = require("../config/env.js");

exports.getData = async function (_url = null) {
  let _response = false;

  await axios({
    method: "get",
    url: `${config.apiBaseUrl}/${_url}`,
  })
    .then((response) => {
      _response = response.data;
    })
    .catch((err) => {
      _response = false;
    });

  return _response;
};
