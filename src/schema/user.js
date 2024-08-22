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
  },
  memberOf: {
    type: Schema.Types.ObjectId,
  },
  links: {
    github: {
      type: String,
    },
    linkdin: {
      type: String,
    },
    portfolio: {
      type: String,
    },
  },
});

module.exports = mongoose.model("User", userSchema);
