import { HttpException } from "./root.js";

export class UnprocessableEntity extends HttpException{
    constructor(error,message,errorCode){
        super(message,errorCode,422,error)
    }
}
