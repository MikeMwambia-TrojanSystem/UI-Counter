/**
 * Client-safe mnemonic generation.
 *
 * bip39.generateMnemonic() is pure, local randomness -- it never needs to
 * touch the network or the server, and the phrase it produces never needs
 * to leave the browser to be generated. This used to live in
 * src/pages/api/get/addressUtils.js alongside Moralis calls that need a
 * secret API key and internal-only HTTP calls -- bundling all of that
 * together into one module meant importing this one safe function dragged
 * server-only code into the client bundle. Splitting it out here lets
 * genMne.jsx use it directly and safely.
 */
const bip39 = require("bip39");

exports.getMnemonic = async function () {
  return bip39.generateMnemonic();
};
