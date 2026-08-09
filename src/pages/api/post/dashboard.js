import {
  createDashboard,
  updateDashboard,
  withdrawDashboard,
  deleteDashboard,
} from "../../../server/services/dashboard.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      const result = await createDashboard("createdashboard", req.body);
      return res.status(200).json(result);
    }
    case "PUT": {
      const result = await updateDashboard("updatedashboard", req.body);
      return res.status(200).json(result);
    }
    case "PATCH": {
      const { id } = req.body || {};
      const result = await withdrawDashboard("withdrawT", id);
      return res.status(200).json(result);
    }
    case "DELETE": {
      const { id } = req.query;
      const result = await deleteDashboard("deleteDashboard", id);
      return res.status(200).json(result);
    }
    default:
      res.setHeader("Allow", "POST, PUT, PATCH, DELETE");
      return res.status(405).json(false);
  }
}
