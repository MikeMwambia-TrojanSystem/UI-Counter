// Kept for parity with the pre-restructure module -- not currently called
// from any page (see audit notes). Wired up as a real route in case it's
// needed; safe to delete if it stays unused.
import { isAddress, getWalletHistory } from "../../../server/services/address.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json(false);
  }

  const { path, walletHistoryFor } = req.query;

  if (walletHistoryFor) {
    const history = await getWalletHistory(walletHistoryFor);
    return res.status(200).json(history);
  }

  const result = await isAddress(path);
  return res.status(200).json(result);
}
