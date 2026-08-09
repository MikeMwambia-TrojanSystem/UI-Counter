import { createOrder, updateOrder } from "../../../server/services/order.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      const result = await createOrder("createorder", req.body);
      return res.status(200).json(result);
    }
    case "PUT": {
      const result = await updateOrder("updateorder", req.body);
      return res.status(200).json(result);
    }
    default:
      res.setHeader("Allow", "POST, PUT");
      return res.status(405).json(false);
  }
}
