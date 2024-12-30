const mongoose = require("mongoose");

const dbConnectFun = async (dbString) => {
  mongoose.connect(dbString);
};

module.exports = dbConnectFun;
