import { mongoose } from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    // select: false,
  },
  email: {
    type: String,
    required: true,
  },
  memberOf: [
    {
      type: Schema.Types.ObjectId,
    },
  ],

  adminAt: [
    {
      type: Schema.Types.ObjectId,
    },
  ],

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

const User = mongoose.model("User", userSchema);

export default User;
