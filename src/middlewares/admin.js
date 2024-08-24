import { UnauthorizedException } from '../exceptions/unauthorized'
import { ErrorCode } from '../exceptions/root'


const adminMiddleware=async(req,res,next)=>{
    const user=req.user
    if(user?.role=='ADMIN'){
        next()
    }
    else{
        next(new UnauthorizedException('Not Admin role',ErrorCode.UNAUTHORIZE_EXCEPTION))
    }
}

export default adminMiddleware