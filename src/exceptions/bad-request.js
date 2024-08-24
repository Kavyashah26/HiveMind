import { ErrorCode, HttpException } from "./root.js";

export class BadRequestException extends HttpException{
    constructor(message,errorCode,errors){
        super(message,errorCode,400,errors);
    }
}