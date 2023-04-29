const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//define routes
const nursesRouter = require("./routers/nurses.router");
const caringTypesRouter = require("./routers/caringTypes.router");
const caringsRouter = require("./routers/caring.router");
const patientRouter = require("./routers/patient.router");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

async function startServer() {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("connected,,");
  app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
}

app.use("/nurses", nursesRouter);
app.use("/caringTypes", caringTypesRouter);
app.use("/carings", caringsRouter);
app.use("/patients", patientRouter);
// app.use("/login", loginRouter);

startServer();
