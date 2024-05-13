const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: String,
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
  },
  dateOfBirth: Date,
  profilePicture: String,
  accountType: {
    type: String,
    enum: ["freelancer", "client"],
    required: true,
  },
  accountStatus: {
    type: String,
    enum: ["active", "suspended"],
    default: "active",
  },
  paymentDetails: {
    type: String,
  },
  //   transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
