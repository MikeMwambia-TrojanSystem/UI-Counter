/**
 * Server-only. Order creation/update against the backend.
 */
const { validCreate, order_1Check, order_2Check } = require("../validation/orderSchema.js");
const axios = require("axios");
const config = require("../config/env.js");

const baseURL = config.orderServiceBaseUrl;

exports.createOrder = async function (_url, _data) {
  const valid = await validCreate(_data);

  if (valid === true) {
    let _response = false;

    await axios({
      method: "post",
      headers: { "content-type": "application/json" },
      url: `${baseURL}/${_url}`,
      params: _data,
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
        _response = response?.data?.id;
      })
      .catch((err) => {
        _response = false;
      });

    return _response;
  }

  return false;
};

exports.updateOrder = async function (_url, _data) {
  const form = _data.form;

  async function updateData(_url, data) {
    let _response = false;

    await axios({
      method: "PUT",
      url: `${baseURL}/${_url}`,
      data: data,
    })
      .then((response) => {
        _response = response.data;
      })
      .catch((err) => {
        _response = false;
      });

    return _response;
  }

  switch (form) {
    case "order_1": {
      // order_1Check/order_2Check are async and return `true` on success or
      // an array of validation errors on failure (fastest-validator). The
      // original code neither awaited this nor checked `=== true` -- a
      // Promise, and separately a (possibly empty) error array, are both
      // truthy in JS, so this branch always ran regardless of validity.
      // Awaited and compared strictly here, matching every other validator
      // call site in this codebase (see validCreate above).
      const order1Update = await order_1Check(_data);
      if (order1Update === true) {
        return await updateData(_url, _data);
      }
      return false;
    }

    case "order_2": {
      const order2Update = await order_2Check(_data);
      if (order2Update === true) {
        return await updateData(_url, _data);
      }
      return false;
    }

    default:
      return false;
  }
};
