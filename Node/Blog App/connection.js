const mongoose = require("mongoose");

async function connectDatabase(url) {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => console.log(err));
}

module.exports = { connectDatabase };
