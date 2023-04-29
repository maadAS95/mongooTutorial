const express = require("express");
const caringRouter = express.Router();
const {
  getAllCarings,
  addNewCarings,
  getOneCaring,
  getCaringByNurseId,
} = require("../controllers/caring.controller");

caringRouter.get("/", async (req, res) => {
  const result = await getAllCarings();
  res.status(200).json({ success: true, code: 200, result }).end().end();
});

caringRouter.post("/", async (req, res) => {
  const body = req.body;
  const result = await addNewCarings(body);
  res.status(200).json({ success: true, code: 200, result }).end().end();
});
caringRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const result = await getOneCaring(id);

  res.status(200).json({ success: true, code: 200, result }).end().end();
});
caringRouter.get("/byNurseId/:id", async (req, res) => {
  const nurseId = req.params.id;
  const result = await getCaringByNurseId(nurseId);
  res.status(200).json({ success: true, code: 200, result }).end().end();
});

module.exports = caringRouter;
