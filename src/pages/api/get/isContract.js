import { isContract } from "../../../server/services/treasury.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json(false);
  }

  const { address } = req.query;
  const result = await isContract(address);
  return res.status(200).json(result);
}
