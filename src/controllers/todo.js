// const Todo = ("../schema/todo.js");
import mongoose, { Schema } from "mongoose";
import Todo from "../schema/todo.js";

//give all todos of a specific user
export const getUsersTodos = async (req, res) => {
  try {
    let { uId } = req.params;
    const userObjectId = new mongoose.Types.ObjectId(uId);
    const allTodo = await Todo.find({ assignedTo: userObjectId });

    if (allTodo) {
      res.json(allTodo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    throw error;
  }
};

//update completed by admin
export const markCompleted = async (req, res) => {
  try {
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
  } catch (error) {
    throw error;
  }
};

//update waiting by member
export const markWaiting = async (req, res) => {
  try {
    let { pid } = req.params;
    let pIdObjectId = new mongoose.Types.ObjectId(pid);
    let todoObjectId = new mongoose.Types.ObjectId(req.body.todoId);
    const result = await Todo.updateOne(
      { _id: todoObjectId, pId: pIdObjectId },
      { $set: { Completed: "waiting" } }
    );
    if (result.matchedCount) {
      res.json({ message: "Todo marked as waiting" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    throw error;
  }
};

//get all project todos
export const getAllProjectTodos = async (req, res) => {
  try {
    let { pid } = req.params;
    let pIdObjectId = new mongoose.Types.ObjectId(pid);
    const allTodos = await Todo.find({ pId: pIdObjectId });
    if (allTodos) {
      res.json(allTodos);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    throw error;
  }
};

// check pid,assignedto is correct
export const createTodo = async (req, res) => {
  try {
    let { pid } = req.params;

    let newTodo = {
      pId:new mongoose.Types.ObjectId(pid),
      assignedTo:new mongoose.Types.ObjectId(req.body.assignedTo),
      taskName:req.body.taskName,
      Completed:false
    }
    
    let savedTodo = await newTodo.create(newTodo);
    res.json(savedTodo);
  } catch (error) {
    throw error;
  }
};
