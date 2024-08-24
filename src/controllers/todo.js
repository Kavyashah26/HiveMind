const Todo = require("../schema/todo");

//give all todos of a specific user
export const getUsersTodos = async (req, res) => {
    let { uId } = req.params;
    const allTodo = await Todo.find({assignedTo:uId});
    if (allTodo) {
        res.json(allTodo);
    } else {
        res.status(404).json({ message: "Todo not found" });
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