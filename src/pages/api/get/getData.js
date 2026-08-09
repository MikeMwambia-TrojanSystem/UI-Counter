import { getData } from "../../../server/services/data.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json(false);
  }

  const { path } = req.query;
  const result = await getData(path);
  return res.status(200).json(result);
}
