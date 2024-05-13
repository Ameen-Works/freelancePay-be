//Need mongoose to establish mongoDB COnnection
const mongoose = require("mongoose");

//Need dotenv to secure DBURL
const dotenv = require("dotenv");
// dotenv.config({ path: "./DB.env" }); //fetch the environment variable from the path

const DB_URL = process.env.DB_URL;

//Establish the default connection to MongoDB
mongoose.connect(DB_URL, {
  useNewUrlParser: true, //The new url parser does not support connection strings that do not have a port, like mongodb://localhost/dbname
  useUnifiedTopology: true, //ServerSessionTimeout in MS if not set by default 30s take to refresh
});

const con = mongoose.connection; //Get connection details

try {
  con.on("connecting", () => {
    console.log("MongoDB Connecting!!!");
  });
  con.on("connected", () => {
    console.log("MongoDB Connected!!!");
  });
  con.on("open", () => {
    console.log("MongoDB Connection is open!!!");
  });
  con.on("disconnecting", () => {
    console.log("MongoDB Disconnecting!!!");
  });
  con.on("disconnected", () => {
    console.log("MongoDB Disconnected!!!");
  });
} catch (error) {
  console.log(DB_URL);
  console.log(error);
}

module.exports = con;
