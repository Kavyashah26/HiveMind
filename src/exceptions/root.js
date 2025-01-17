// message, status code, error codes, error 

class HttpException extends Error{
    message;
    errorCode;
    statusCode;
    errors;

    constructor(message,errorCode,statusCode,errors){
        super(message)

        this.message=message,
        this.errorCode=errorCode,
        this.statusCode=statusCode,
        this.errors=errors

    }

}

// export enum ErrorCode{
//     USER_NOT_FOUND=1001,
//     USER_ALREADY_EXIST=1002,
//     INCORRECT_PASSWORD=1003,
//     ADDRESS_NOT_FOUND=1004,
//     ADDRESS_DOES_NOT_BELONG=1005,
//     UNPROCESSABLE_ENTITY=2001,
//     INTERNAL_EXCEPTION=3001,
//     UNAUTHORIZE_EXCEPTION=4001,
//     PRODUCT_NOT_FOUND=5001,


// }

const ErrorCode = Object.freeze({
    USER_NOT_FOUND: 1001,
    USER_ALREADY_EXIST: 1002,
    INCORRECT_PASSWORD: 1003,
    UNPROCESSABLE_ENTITY: 2001,
    INTERNAL_EXCEPTION: 3001,
    UNAUTHORIZE_EXCEPTION: 4001,
    TODO_NOT_FOUND: 5001,
    PROJECT_NOT_FOUND: 6001,
    RESOURCE_NOT_FOUND: 7001,
    INVALID_RESOURCEID: 7002,
    INVALID_PROJECTID: 8001,
    USER_ALREADY_EXIST_IN_PROJECT: 9001,
    MEMEBER_NOT_FOUND:10001,
    TODO_ALREADY_IN_WAITING:11001,
    TODO_ALREADY_IN_COMPLETED:12001,
    INVALID_USERID:13001,
    MISCELLANEOUS_ERROR:14001,
});

export { ErrorCode,HttpException };