 
import { ErrorCode } from '../exceptions/root.js'
import jwt from 'jsonwebtoken'
// import { JWT_SECRET } from '../secrets'
// import { prismaClient } from '..'
import  {UnauthorizedException} from "../exceptions/unauthorized.js"
import User from '../schema/user.js';


const authMiddleware=async(req,res,next)=>{
    //extract token from header 
    // throw error if token is not there
    // if token is there then verify it
    //extract payload
    //get user from db through payload
    //to attach user to the current req object
    
const JWT_SECRET = process.env.JWT_SECRET || "abcdef";
    const token=req.headers.authorization
    console.log(token);
    if(!token){
        console.log("a");
        
        next(new UnauthorizedException ("Unauthorized exception",ErrorCode.UNAUTHORIZE_EXCEPTION))
    }
    try {
        // if (typeof token !== 'string') {
        //     throw new UnauthorizedException("Unauthorized exception", ErrorCode.UNAUTHORIZE_EXCEPTION);
        // }
        console.log("pre verify");
        
        const payload =jwt.verify(token,JWT_SECRET)
        console.log("after verify");
        console.log(payload);
        
        
        // const user=await prismaClient.user.findFirst({
        //     where:{id: payload.userId}
        // })
        let user = await User.findOne({email:payload.email});
        console.log(user);
        
        if(!user){
            console.log("b");
            
            throw new UnauthorizedException("Unauthorized exception", ErrorCode.UNAUTHORIZE_EXCEPTION);
        }
        req.user=user
        console.log("User from request",req.user);
        
        next()

    } catch (error) {
        next(new UnauthorizedException("Unauthorized exception",ErrorCode.UNAUTHORIZE_EXCEPTION))
    }

}

export default authMiddleware