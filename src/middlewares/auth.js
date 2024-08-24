// import {Request,Response,NextFunction} from 'express' 
// import { ErrorCode } from '../exceptions/root'
// import *  as jwt from 'jsonwebtoken'
// // import { JWT_SECRET } from '../secrets'
// // import { prismaClient } from '..'

// const JWT_SECRET = process.env.JWT_SECRET;

// const authMiddleware=async(req,res,next)=>{
//     //extract token from header 
//     // throw error if token is not there
//     // if token is there then verify it
//     //extract payload
//     //get user from db through payload
//     //to attach user to the current req object

//     const token=req.headers.authorization
//     if(!token){
//         next(new UnauthorizedException("Unauthorized exception",ErrorCode.UNAUTHORIZE_EXCEPTION))
//     }
//     try {
//         if (typeof token !== 'string') {
//             throw new UnauthorizedException("Unauthorized exception", ErrorCode.UNAUTHORIZE_EXCEPTION);
//         }
//         const payload =jwt.verify(token,JWT_SECRET)
        
//         const user=await prismaClient.user.findFirst({
//             where:{id: payload.userId}
//         })
        
//         if(!user){
//             throw new UnauthorizedException("Unauthorized exception", ErrorCode.UNAUTHORIZE_EXCEPTION);
//         }
//         req.user=user

//         next()

//     } catch (error) {
//         next(new UnauthorizedException("Unauthorized exception",ErrorCode.UNAUTHORIZE_EXCEPTION))
//     }

// }

// export default authMiddleware