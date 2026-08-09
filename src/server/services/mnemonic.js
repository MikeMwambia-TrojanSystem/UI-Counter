/**
 * Server-only. Forwards a generated mnemonic phrase to the wallet
 * generator backend to derive an on-chain address.
 *
 * SECURITY NOTE (see audit write-up): this still transmits the raw seed
 * phrase over the network to `config.generatorBaseUrl`, same as before.
 * Moving this behind a real API route fixes the immediate bug -- previously
 * this ran in the browser and POSTed the phrase in plaintext HTTP directly
 * to an internal-only hostname the browser generally can't even reach, so
 * it was both broken and, on any network topology where it wasn't broken,
 * a cleartext secret-in-transit exposure. Now it goes browser -> this
 * site's own HTTPS -> internal service, which is a real trust boundary.
 * It does NOT make the phrase-over-the-wire design itself secure by
 * default -- that's a product decision (custodial generation service vs.
 * fully client-side HD derivation) that's out of scope for this pass and
 * flagged separately for follow-up.
 */
const { validCreate } = require("../validation/mnemonicSchema.js");
const axios = require("axios");
const config = require("../config/env.js");

exports.genAddress = async function (_url, _data) {
  const valid = await validCreate(_data);

  if (valid === true) {
    let _response = false;

    await axios({
      method: "post",
      headers: { "content-type": "application/json" },
      url: `${config.generatorBaseUrl}/${_url}`,
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
        _response = response.data;
      })
      .catch((err) => {
        _response = false;
      });

    return _response;
  }

  return false;
};
