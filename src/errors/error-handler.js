import { NextFunction,Request,Response } from "express"
import { ErrorCode, HttpException } from "./exceptions/root"
import { InternalException } from "./exceptions/internal-exception"
import { ZodError } from "zod"
import { BadRequestException } from "./exceptions/bad-request"

export const errorHandler= (method)=>{
    return async (req,res,next)=>{
        try {
            await method(req,res,next)
        } catch (error) {
            let exception;
            if(error instanceof HttpException){
                exception=error
            }else{

                if(error instanceof ZodError){
                    exception=new BadRequestException('Unprocessable entity , ZOD error',ErrorCode.UNPROCESSABLE_ENTITY,error)
                }else{
                    exception=new InternalException("Something went wrong internally",error,ErrorCode.INTERNAL_EXCEPTION)
                }
            }
            next(exception)
        }
    }
}