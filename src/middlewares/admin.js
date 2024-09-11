import { UnauthorizedException } from '../exceptions/unauthorized.js'
import { ErrorCode } from '../exceptions/root.js'
import Project from '../schema/project.js';
import {mongoose} from "mongoose"
import {InternalException} from "../exceptions/internal-exception.js";
import { NotFoundException } from "../exceptions/not-found.js";

import { BadRequestException } from "../exceptions/bad-request.js";

const adminMiddleware=async(req,res,next)=>{
    const {pid} = req.params;
    if (!mongoose.Types.ObjectId.isValid(pid)) {
        console.log("\t\t\tInvalid");
        
        next(
            new BadRequestException('Project id is invalid',ErrorCode.INVALID_PROJECTID ));
    }else{

        const objectId = new mongoose.Types.ObjectId(pid);
        // const adminId = await Project.findById(pid);
        let projectDetail
        try {
            console.log("abced");
            
            projectDetail = await Project.findById(objectId);
            console.log("pqer");
            
            console.log(projectDetail);
            
        } catch (error) {
            console.log("Error is :\t",error);
            
            throw new InternalException('Unable to get Project details',ErrorCode.INTERNAL_EXCEPTION);
        }
        // console.log("adminId", adminId);
        const uid = req.user.id;
        // console.log("uid",uid);
        // console.log("leaderid",projectDetail.teamLeader);
        
        if(!projectDetail){
            //   throw new NotFoundException('Project not found.',ErrorCode.PROJECT_NOT_FOUND);
            next(new NotFoundException("Project not found",ErrorCode.PROJECT_NOT_FOUND))
        }else{
            if(projectDetail.teamLeader.toString()===uid){
                next()
            }
            else{
                next(new UnauthorizedException('Not Admin role',ErrorCode.UNAUTHORIZE_EXCEPTION))
            }
        }
    }
}

export default adminMiddleware


// we need to modify code as a user can me admin at multiple position