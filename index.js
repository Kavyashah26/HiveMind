import express,{Express,Request,Response}  from "express";
// import { PORT } from "./secrets";
import rootRoutes from "./routes";
import { errorMiddleware } from "./middlewares/errors.js";
import { signupSchema } from "./schema/users";

const app=express();

app.use(express.json())
app.use('/api',rootRoutes)

app.use(errorMiddleware)

app.get('/',(req,res)=>{
    res.send('Working')
})

app.listen(PORT,()=>{
    console.log("App working!!");
    
});