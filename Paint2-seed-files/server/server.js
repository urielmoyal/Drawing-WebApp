const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const { sendImages, uploadImages, deleteAllImages } = require("./utilize");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", sendImages);

app.post("/", uploadImages);

app.delete("/", deleteAllImages);

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
