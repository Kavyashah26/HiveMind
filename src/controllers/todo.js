// const Todo = ("../schema/todo.js");
import mongoose, { Schema } from "mongoose";
import Todo from "../schema/todo.js";
import User from "../schema/user.js";
import Project from "../schema/project.js";
import { ErrorCode } from "../exceptions/root.js";
import { InternalException } from "../exceptions/internal-exception.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { BadRequestException } from "../exceptions/bad-request.js";

//give all todos of a specific user
export const getUsersTodos = async (req, res) => {
  // let { uId } = req.params;
  console.log("UserID:",req.user.id);
  let uId=req.user.id;
  

  if (!mongoose.Types.ObjectId.isValid(uId)) {
    throw new BadRequestException(
      "User id is invalid",
      ErrorCode.USER_NOT_FOUND
    );
  }

  const userObjectId = new mongoose.Types.ObjectId(uId);
  let currUser = await User.findById(userObjectId);
  if (!currUser) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  const allTodo = await Todo.find({ assignedTo: userObjectId });

  if (allTodo) {
    res.json(allTodo);
  } else {
    throw new InternalException(
      "Unable to get Todo",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
};

//update completed by admin
export const markCompleted = async (req, res) => {
  let { pid } = req.params;
  let pIdObjectId = new mongoose.Types.ObjectId(pid);

  let todoObjectId = new mongoose.Types.ObjectId(req.body.todoId);
  let curr_todo = await Todo.findById(todoObjectId);
  if (!curr_todo) {
    throw new NotFoundException("Todo not found.", ErrorCode.TODO_NOT_FOUND);
  }

  let project = await Project.findById(pIdObjectId);
  if (!project) {
    throw new NotFoundException(
      "Project not found.",
      ErrorCode.PROJECT_NOT_FOUND
    );
  }

  if (curr_todo.pId.toString() !== pid) {
    throw new NotFoundException(
      "Todo not found in project id.",
      ErrorCode.TODO_NOT_FOUND
    );
  }

  if (curr_todo.Completed == "True") {
    throw new BadRequestException(
      "Todo already in True state.",
      ErrorCode.TODO_ALREADY_IN_COMPLETED
    );
  }

  const result = await Todo.updateOne(
    { _id: todoObjectId, pId: pIdObjectId },
    { $set: { Completed: "True" } }
  );
  console.log(result);
  if (result.matchedCount) {
    res.json({ message: "Todo marked as completed" });
  } else {
    throw new InternalException(
      "Unable to mark Todo as True",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
};

//update waiting by member
export const markWaiting = async (req, res) => {
  let { pid } = req.params;
  if (!mongoose.Types.ObjectId.isValid(pid)) {
    throw new BadRequestException(
      "Project id is invalid",
      ErrorCode.INVALID_PROJECTID
    );
  }

  let todoObjectId = new mongoose.Types.ObjectId(req.body.todoId);
  let curr_todo = await Todo.findById(todoObjectId);
  if (!curr_todo) {
    throw new NotFoundException("Todo not found.", ErrorCode.TODO_NOT_FOUND);
  }

  let pIdObjectId = new mongoose.Types.ObjectId(pid);
  let project = await Project.findById(pIdObjectId);
  if (!project) {
    throw new NotFoundException(
      "Project not found.",
      ErrorCode.PROJECT_NOT_FOUND
    );
  }

  if (curr_todo.pId.toString() !== pid) {
    throw new NotFoundException(
      "Todo not found in project id.",
      ErrorCode.TODO_NOT_FOUND
    );
  }

  if (curr_todo.Completed == "waiting") {
    throw new BadRequestException(
      "Todo already in waiting state.",
      ErrorCode.TODO_ALREADY_IN_WAITING
    );
  }

  const result = await Todo.updateOne(
    { _id: todoObjectId, pId: pIdObjectId },
    { $set: { Completed: "waiting" } }
  );
  if (result.matchedCount) {
    res.json({ message: "Todo marked as waiting" });
  } else {
    throw new InternalException(
      "Unable to mark Todo as waiting",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
};

//get all project todos
export const getAllProjectTodos = async (req, res) => {
  const { pid } = req.params;

  // Check if the project ID is valid
  if (!mongoose.Types.ObjectId.isValid(pid)) {
    throw new BadRequestException(
      "Project ID is invalid",
      ErrorCode.INVALID_PROJECTID
    );
  }

  const pIdObjectId = new mongoose.Types.ObjectId(pid);

  // Find the project by ID
  const project = await Project.findById(pIdObjectId);
  if (!project) {
    throw new NotFoundException(
      "Project not found.",
      ErrorCode.PROJECT_NOT_FOUND
    );
  }

  // Find all Todos for the project
  let allTodos = await Todo.find({ pId: pIdObjectId });

  if (!allTodos) {
    throw new InternalException(
      "Unable to find Todos",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }

  // Modify each todo to include the name of the assigned user
  const todosWithUserNames = await Promise.all(
    allTodos.map(async (todo) => {
      const user = await User.findById(todo.assignedTo);
      if (user) {
        return {
          ...todo.toObject(), // Convert todo to plain object to modify it
          assignedToName: user.name, // Add the user's name to the todo
        };
      } else {
        return {
          ...todo.toObject(),
          assignedToName: "Unknown User", // Handle case where user is not found
        };
      }
    })
  );

  // Respond with the modified todos
  res.json(todosWithUserNames);
};


export const createTodo = async (req, res) => {
  let { pid } = req.params;
  console.log("create to do");

  pid = new mongoose.Types.ObjectId(pid);
  console.log("pid",pid);
  let userId = new mongoose.Types.ObjectId(req.body.assignedTo);
  console.log("uid",userId);
  
  let project = await Project.findById(pid);
  if (!project) {
    throw new NotFoundException(
      "Project not found.",
      ErrorCode.PROJECT_NOT_FOUND
    );
  }
  console.log("project", project);
  
  let user = await User.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found.", ErrorCode.USER_NOT_FOUND);
  }
  console.log("user",user);
  
  const existingMember = project.teamMembers.find(
    (mem) => mem.teamMember.toString() === userId.toString()
  );
  if (!existingMember) {
    throw new NotFoundException(
      "Given User not exist in project.",
      ErrorCode.MEMEBER_NOT_FOUND
    );
  }
  console.log("true exist");
  
  let newTodo = {
    pId: pid,
    assignedTo: userId,
    taskName: req.body.taskName,
    Completed: "False",
  };

  let savedTodo = await Todo.create(newTodo);
  if (!savedTodo) {
    throw new InternalException(
      "Unable to create Todo",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
  res.json(savedTodo);
};