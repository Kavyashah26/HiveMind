import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";
const DB_NAME="abc"

const connectDb=async ()=>{
    console.log("Hello");
    
    try {
        const connectionInstance =await mongoose.connect(`${process.env.DATABASE_URL}`)

        console.log(`\n Mongodb connected !! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Mongodb connection error",error);
        process.exit(1)
    }
}

export default connectDb