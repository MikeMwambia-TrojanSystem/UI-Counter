import { createAsset } from "../../../server/services/asset.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json(false);
  }

  const result = await createAsset("createasset", req.body);
  return res.status(200).json(result);
}
