const express = require("express");
const router = express.Router();
const {
  getAllCaringTypes,
  getCaringType,
  updateCaringType,
  removeCaringType,
  addNewCType,
  searchCType,
} = require("../controllers/caringTypes.controller");

router.get("/", async (req, res) => {
  const result = await getAllCaringTypes();
  res.status(200).json({ success: true, code: 200, result }).end();
});
router.post("/", async (req, res) => {
  const { name, description } = req.body;
  if (!description || !name)
    return res
      .status(404)
      .send({ message: "please provide a description or name" })
      .end();
  const result = await addNewCType(req.body);
  res.status(200).json({ success: true, code: 200, result }).end();
});
router.get("/:id", async (req, res) => {
  const cTypeId = req.params.id;

  const result = await getCaringType(cTypeId);
  res.status(200).json({ success: true, code: 200, result }).end();
});
router.delete("/:id", async (req, res) => {
  const cTypeId = req.params.id;

  const result = await removeCaringType(cTypeId);
  res.status(200).json({ success: true, code: 200, result }).end();
});
router.patch("/:id", async (req, res) => {
  const cTypeId = req.params.id;
  const data = req.body;

  if (!cTypeId)
    return res
      .status(400)
      .json({
        message: "please provide caringType id",
        success: false,
        code: 400,
      })
      .end();
  const result = await updateCaringType(cTypeId, data);
  res.status(200).json({ success: true, code: 200, result }).end();
});

router.post("/search", async (req, res) => {
  const { searchValue } = req.body;
  console.log(searchValue, "searchValue");
  if (!searchValue)
    return res
      .status(400)
      .json({ success: false, code: 400, messege: "Bad Request" })
      .end();

  const result = await searchCType(searchValue);
  res.status(200).json({ success: true, code: 200, result }).end();
});

module.exports = router;
