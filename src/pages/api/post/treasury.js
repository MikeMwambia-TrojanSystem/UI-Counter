import { createTreasury } from "../../../server/services/treasury.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json(false);
  }

  const result = await createTreasury("createtreasury", req.body);
  return res.status(200).json(result);
}
