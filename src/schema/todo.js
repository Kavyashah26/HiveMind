const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const completedEnum = ["waiting", "True", "False"];

const todoSchema = new Schema({
  pId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  taskName: {
    type: String,
    required: true,
  },
  Completed: {
    type: String,
    enum: completedEnum,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
