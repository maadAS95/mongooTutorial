const express = require("express");
const nursesRouter = express.Router();
const {
  getAllNurses,
  addNewNurse,
  updateNurse,
  removeOneNurse,
  getOneNurse,
  searchNurses,
} = require("../controllers/nurses.controller");

nursesRouter.get("/", async (req, res) => {
  const result = await getAllNurses();

  res.status(200).json({ success: true, code: 200, result }).end();
});

nursesRouter.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: result.message }).end();
    return;
  }
  const result = await addNewNurse(req.body);

  if (!result) {
    res
      .status(400)
      .json({ message: "error adding new nurse", result: {} })
      .end();
    return;
  }
  res.status(201).json({ success: true, code: 200, result }).end();
});

nursesRouter.get("/:id", async (req, res) => {
  const nurseId = req.params.id;
  if (!nurseId)
    return res.status(400).send({ message: "please provide nurse id" }).end();
  const result = await getOneNurse(nurseId);
  res.status(200).json({ success: true, code: 200, result }).end();
});

nursesRouter.delete("/:id", async (req, res) => {
  const nurseId = req.params.id;
  if (!nurseId)
    return res.status(400).send({ message: "please provide nurse id" }).end();

  const result = await removeOneNurse(nurseId);
  res.status(200).json({ success: true, code: 200, result }).end();
});
nursesRouter.patch("/:id", async (req, res) => {
  const nurseId = req.params.id;
  const data = req.body;

  if (!nurseId)
    return res
      .status(400)
      .json({ message: "please provide nurse id", success: false, code: 400 })
      .end();
  const result = await updateNurse(nurseId, data);
  res.status(200).json({ success: true, code: 200, result }).end();
});

nursesRouter.post("/search", async (req, res) => {
  const { searchValue } = req.body;

  if (!searchValue)
    return res
      .status(400)
      .json({ success: false, code: 400, messege: "Bad Request" })
      .end();

  const result = await searchNurses(searchValue);
  res.status(200).json({ success: true, code: 200, result }).end();
});
module.exports = nursesRouter;
