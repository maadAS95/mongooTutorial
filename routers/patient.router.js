const express = require("express");
const patientRouter = express.Router();

const {
  getAllPatients,
  addNewPatient,
  getOnePatient,
  removePatient,
  searchPatient,
  updatePatient,
} = require("../controllers/patient.controller");

patientRouter.get("/", async (req, res) => {
  const result = await getAllPatients();
  res.status(200).json({ success: true, code: 200, result }).end();
});

patientRouter.post("/", async (req, res) => {
  const { name, room, phone, isStopped } = req.body;
  if (!room || !name || !isStopped || !phone)
    return res
      .status(400)
      .send({ message: "please provide  full required data" })
      .end();
  const result = await addNewPatient(req.body);
  res.status(200).json({ success: true, code: 200, result }).end();
});

patientRouter.get("/:id", async (req, res) => {
  const patientId = req.params.id;
  if (!patientId)
    return res.status(400).send({ message: "please provide patient id" }).end();
  const result = await getOnePatient(patientId);
  res.status(200).json({ success: true, code: 200, result }).end();
});
patientRouter.delete("/:id", async (req, res) => {
  const patientId = req.params.id;
  console.log(patientId, "patientId");
  const result = await removePatient(patientId);
  res.status(200).json({ success: true, code: 200, result }).end();
});

patientRouter.post("/search", async (req, res) => {
  const { searchValue } = req.body;
  console.log(searchValue, "searchValue");
  if (!searchValue)
    return res
      .status(400)
      .json({ success: false, code: 400, messege: "Bad Request" })
      .end();

  const result = await searchPatient(searchValue);
  res.status(200).json({ success: true, code: 200, result }).end();
});

patientRouter.patch("/:id", async (req, res) => {
  const patientId = req.params.id;
  const data = req.body;

  if (!patientId)
    return res
      .status(400)
      .json({ message: "please provide patient id", success: false, code: 400 })
      .end();
  const result = await updatePatient(patientId, data);
  res.status(200).json({ success: true, code: 200, result }).end();
});

module.exports = patientRouter;
