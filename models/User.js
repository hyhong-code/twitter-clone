const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: [true, "A handle is required"],
    trim: true,
    lowercase: true,
    minlength: [5, "A handle must be at least 5 charactres long"],
    maxlength: [15, "A handle must be no more than 15 characters long"],
    match: [
      /^[a-zA-Z0-9-_]+$/,
      'A handle can only contain "a-z", "0-9", "_", and "-"',
    ],
  },
  email: {
    type: String,
    required: [true, "An email is required"],
    trim: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Please provide a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "A password must be at least 6 characters long"],
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v === this.password;
      },
      message: "Passwords do not match",
    },
  },
  passwordChangedAt: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// HASH USER PASSWORD BEFORE SAVING
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  this.passwordChangedAt = new Date(Date.now() - 5000);
});

// VERIFY USER PASSWORD
UserSchema.isCorrectPassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
