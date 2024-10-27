const mongoose = require("mongoose");

async function mongoConnect(dbURL) {
  await mongoose
    .connect(dbURL)
    .then(() => console.log("Mongodo server started"))
    .catch((err) => console.log("cannot connect: ", err));
}

module.exports = { mongoConnect };
