// const Todo = ("../schema/todo.js");
import mongoose, { Schema } from "mongoose";
import Todo from "../schema/todo.js";

//give all todos of a specific user
export const getUsersTodos = async (req, res) => {
  let { uId } = req.params;
  const userObjectId = new mongoose.Types.ObjectId(uId);
  const allTodo = await Todo.find({ assignedTo: userObjectId });
  console.log(uId);
  console.log(allTodo);

  if (allTodo) {
    res.json(allTodo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

//update completed by admin
export const markCompleted = async (req, res) => {
  let { pid } = req.params;
  let pIdObjectId = new mongoose.Types.ObjectId(pid);
  let todoObjectId = new mongoose.Types.ObjectId(req.body.todoId);
  const result = await Todo.updateOne(
    { _id: todoObjectId, pId: pIdObjectId },
    { $set: { Completed: "True" } }
  );
  console.log(result);
  if (result.matchedCount) {
    res.json({ message: "Todo marked as completed" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

//update waiting by member
export const markWaiting = async (req, res) => {
  let { pid } = req.params;
  let pIdObjectId = new mongoose.Types.ObjectId(pid);
  let todoObjectId = new mongoose.Types.ObjectId(req.body.todoId);
  const result = await Todo.updateOne(
    { _id: todoObjectId, pId: pIdObjectId },
    { $set: { Completed: "waiting" } }
  );
  if (result.matchedCount) {
    res.json({ message: "Todo marked as waiting",});
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

//get all project todos
export const getAllProjectTodos = async (req, res) => {
  let { pid } = req.params;
  let pIdObjectId = new mongoose.Types.ObjectId(pid);
  const allTodos = await Todo.find({ pId: pIdObjectId });
  if (allTodos) {
    res.json(allTodos);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

export const createTodo = async (req,res) => {
    let {pid} = req.params;
    let pIdObjectId = new mongoose.Types.ObjectId(pid);
    let newTodo = new Todo(req.body);
    newTodo.assignedTo = new mongoose.Types.ObjectId(newTodo.assignedTo);
    newTodo.pId = pid;
    let savedTodo = await newTodo.save();
    res.json(savedTodo);
};
