import { UnauthorizedException } from '../exceptions/unauthorized.js'
import { ErrorCode } from '../exceptions/root.js'
import Project from '../schema/project.js';

const adminMiddleware=async(req,res,next)=>{
    const {pid} = req.params;
    const adminId = await Project.findById(pid,'teamLeader');
    const uid = req.user.id;
    if(adminId.teamLeader.toString()===uid){
        next()
    }
    else{
        next(new UnauthorizedException('Not Admin role',ErrorCode.UNAUTHORIZE_EXCEPTION))
    }
}

export default adminMiddleware


// we need to modify code as a user can me admin at multiple position