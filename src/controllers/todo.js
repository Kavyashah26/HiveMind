// const Todo = ("../schema/todo.js");
import mongoose from "mongoose";
import Todo from "../schema/todo.js";

//give all todos of a specific user
// export const getUsersTodos = async (req, res) => {
//     let { uId } = req.params;
//     // const userObjectId = mongoose.Types.ObjectId(uId);
//     const userObjectId = mongoose.Types.ObjectId(uId)
//     const allTodo = await Todo.find({assignedTo:userObjectId});
//     console.log(uId);
//     console.log(allTodo);
    
//     if (allTodo) {
//         res.json(allTodo);
//     } else {
//         res.status(404).json({ message: "Todo not found" });
//     }
// };

// import mongoose from "mongoose";

export const getUsersTodos = async (req, res) => {
    let { uId } = req.params;
    
    // Use 'new' to create a new ObjectId instance
    const userObjectId = new mongoose.Types.ObjectId(uId);

    try {
        const allTodo = await Todo.find({  });
        console.log(userObjectId);
        console.log(allTodo);

        if (allTodo.length > 0) {
            res.json(allTodo);
        } else {
            res.status(404).json({ message: "Todo not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//update completed by admin
export const markCompleted = async (req,res) => {
    let {pId} = req.params;
    const updateTodo = await Todo.findByIdAndUpdate(pId,{Completed:True},{new:true,runValidators:true});
    if(updateTodo) {
        res.json({message:"Todo marked as completed",todo:updateTodo});
    } else {
        res.status(404).json({ message: "Todo not found" });
    }
};

//update waiting by member
export const markWaiting = async(req,res) => {
    let {pId} = req.params;
    const updateTodo = await Todo.findByIdAndUpdate(pId,{Completed:waiting},{new:true,runValidators:true});
    if(updateTodo) {
        res.json({message:"Todo marked as waiting",todo:updateTodo});
    } else {
        res.status(404).json({ message: "Todo not found" });
    }
};

//get all project todos
export const getAllProjectTodos = async(req,res) => {
    let {pId} = req.params;
    const allTodos = await Todo.find({pId:pId});
    if(allTodos) {
        res.json(allTodos);
    } else {
        res.status(404).json({ message: "Todo not found" });
    }
} 
 
export const createTodo=()=>{}  