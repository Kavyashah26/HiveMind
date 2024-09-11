// import express  from "express";
import express from "express"
// import { PORT } from "./secrets";
// import rootRoutes from "./";
import { errorMiddleware } from "./middlewares/errors.js";
import rootRoutes from "./src/routes/index.js";
import connectDb from "./src/db/index.js";
// import { signupSchema } from "./schema/users";
import dotenv from "dotenv";
dotenv.config(); 

const app=express();

app.use(express.json())
app.use('/api',rootRoutes)

app.use(errorMiddleware)

app.get('/',(req,res)=>{
    res.send('Working')
})

app.listen(3000,()=>{
    console.log("App working!!");
    
});

console.log(process.env.JWT_SECRET);


connectDb();