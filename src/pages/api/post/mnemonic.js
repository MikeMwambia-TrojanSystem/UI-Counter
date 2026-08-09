import { genAddress } from "../../../server/services/mnemonic.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json(false);
  }

  const result = await genAddress("generateAddress", req.body);
  return res.status(200).json(result);
}
