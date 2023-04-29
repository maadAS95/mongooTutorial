const express = require("express");
const caringRouter = express.Router();
const {
  getAllCarings,
  addNewCarings,
  getOneCaring,
  getCaringByNurseId,
  searchCaring,
  updateCaring,
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

caringRouter.post("/search", async (req, res) => {
  const { searchValue } = req.body;
  console.log(searchValue, "searchValue");
  if (!searchValue)
    return res
      .status(400)
      .json({ success: false, code: 400, messege: "Bad Request" })
      .end();

  const result = await searchCaring(searchValue);
  res.status(200).json({ success: true, code: 200, result }).end();
});

caringRouter.patch("/:id", async (req, res) => {
  const caringId = req.params.id;
  const data = req.body;

  if (!caringId)
    return res
      .status(400)
      .json({
        message: "please provide caring id",
        success: false,
        code: 400,
      })
      .end();
  const result = await updateCaring(caringId, data);
  res.status(200).json({ success: true, code: 200, result }).end();
});

module.exports = caringRouter;
