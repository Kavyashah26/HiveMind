
// import { ErrorCode, HttpException } from "./exceptions/root"
// import { InternalException } from "./exceptions/internal-exception"
// import { ZodError } from "zod"
// import { BadRequestException } from "./exceptions/bad-request.js"

// export const errorHandler= (method)=>{
//     return async (req,res,next)=>{
//         try {
//             await method(req,res,next)
//         } catch (error) {
//             let exception;
//             if(error instanceof HttpException){
//                 exception=error
//             }else{

//                 if(error instanceof ZodError){
//                     exception=new BadRequestException('Unprocessable entity , ZOD error',ErrorCode.UNPROCESSABLE_ENTITY,error)
//                 }else{
//                     exception=new InternalException("Something went wrong internally",error,ErrorCode.INTERNAL_EXCEPTION)
//                 }
//             }
//             next(exception)
//         }
//     }
// }

// import { ErrorCode, HttpException } from "../exceptions/root";
import { InternalException } from "../exceptions/internal-exception.js";
import { ZodError } from "zod";
import { BadRequestException } from "../exceptions/bad-request.js";
import { ErrorCode, HttpException } from "../exceptions/root.js";

export const errorHandler = (method) => {
    return async (req, res, next) => {
        try {
            await method(req, res, next);
        } catch (error) {
            let exception;
            // console.log("In error handler", error);
            
            if (error instanceof HttpException) {
                // console.log("Http error");
                
                exception = error;
            } else {
                // console.log("In else");
                
                if (error instanceof ZodError) {
                    // console.log("In zod");
                    
                    exception = new BadRequestException(
                        'Unprocessable entity, ZOD error',
                        ErrorCode.UNPROCESSABLE_ENTITY,
                        error
                    );
                } else {
                    // console.log("In internal");
                    // console.log(error);
                    
                    exception = new InternalException(
                        'Something went wrong internally',
                        error,
                        ErrorCode.INTERNAL_EXCEPTION
                        // ErrorCode
                    );
                }
            }

            // Ensure next() is called with the exception
            next(exception);
        }
    };
};

