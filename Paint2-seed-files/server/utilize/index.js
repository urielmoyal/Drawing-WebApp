const fs = require("fs");

const sendImages = (req, res) => {
  try {
    const data = fs.readFileSync("./images.json", "utf8");
    const databases = JSON.parse(data);
    res.json({ payload: databases, sucsess: true });
  } catch (err) {
    res.status(500).json({ msg: "Field To Get Image From the server", sucsess: false });
  }
};

const uploadImages = (req, res) => {
  fs.readFile("./images.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ msg: "Field To Save Images", sucsess: false });
    } else {
      const databases = JSON.parse(data);
      databases.push({
        src: req.body.src,
      });

      fs.writeFile("./images.json", JSON.stringify(databases, null, 4), (err) => {
        if (err) {
          res.status(500).json({ msg: "Field To Save Images To The Server", sucsess: false });
        }
      });
      res.json({ msg: "Saved Smage Sucsessfully", sucsess: true });
    }
  });
};

const deleteAllImages = (req, res) => {
  fs.writeFile("./images.json", JSON.stringify([], null, 4), (err) => {
    if (err) {
      res.status(500).json({ msg: "Fielded To Delete Images From the Server", sucsess: false });
    }
  });
  res.json({ msg: "All Images Deleted", sucsess: true });
};

module.exports = { sendImages, uploadImages, deleteAllImages };
