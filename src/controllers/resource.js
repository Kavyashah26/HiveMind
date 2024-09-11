import { InternalException } from "../exceptions/internal-exception.js";
import { ErrorCode } from "../exceptions/root.js";
import Project from "../schema/project.js";
import Resource from "../schema/resource.js";
import { NotFoundException } from "../exceptions/not-found.js";
import mongoose from "mongoose";
import { BadRequestException } from "../exceptions/bad-request.js";

export const createResource = async (req, res) => {
    const pid = req.body.pid;
    if (!mongoose.Types.ObjectId.isValid(pid)) {
      console.log("\t\t\tInvalid1233");
          throw new BadRequestException('Project id is invalid',ErrorCode.INVALID_PROJECTID );
      }

      const existingProject = await Project.findById(pid);
if (!existingProject) {
  throw new NotFoundException('Project not found.',ErrorCode.PROJECT_NOT_FOUND);
}
    console.log("Pid", pid);
    
    const resourceBody = {
      name: req.body.name,
      link: req.body.link,
      resourceType: req.body.resourceType,
    };
    const newResource = await Resource.create(resourceBody);

    if (newResource) {
      const updatedProject = await Project.findByIdAndUpdate(
        pid,
        { $push: { Resources: newResource._id } },
        { runValidators: true, new: true }
      );
      console.log(updatedProject);
      res.json({ newResource, updatedProject });
    } else {
      // res.status(404).json({ message: "Something went wrong" });
      throw new InternalException('Unable to Create Resource', ErrorCode.INTERNAL_EXCEPTION);
    }
};

export const updateResource = async (req, res) => {
  const { rid } = req.params;
  if (!mongoose.Types.ObjectId.isValid(rid)) {
    console.log("\t\t\tInvalid1233");
        throw new BadRequestException('Resource id is invalid',ErrorCode.INVALID_RESOURCEID);
    }
  const existingResource = await Resource.findById(rid);
    if (!existingResource) {
      // return res.status(404).json({ message: "Resource not found" });
      
      throw new NotFoundException('Resource not found.',ErrorCode.RESOURCE_NOT_FOUND);
    }
  const updatedFields = {
    name:req.body.name,
    link:req.body.link,
    resourceType:req.body.resourceType,
  }
  let updatedResource = await Resource.findByIdAndUpdate(
    rid,
    updatedFields,
    { new: true, runValidators: true }
  );
  if (updateResource) {
    res.json({
      message: "Resource updated",
      resource: updatedResource,
    });
  } else {
    // res.status(404).json({ message: "Something went wrong" });
    
    throw new InternalException('Unable to Update Resource', ErrorCode.INTERNAL_EXCEPTION);
  }
};

export const deleteResource = async (req, res) => {
    const { rid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(rid)) {
      console.log("\t\t\tInvalid1233");
          throw new BadRequestException('Resource id is invalid',ErrorCode.INVALID_RESOURCEID);
      }
    const existingResource = await Resource.findById(rid);
      if (!existingResource) {
        // return res.status(404).json({ message: "Resource not found" });
        
        throw new NotFoundException('Resource not found.',ErrorCode.RESOURCE_NOT_FOUND);
      }

      const { pid } = req.body;

      if (!mongoose.Types.ObjectId.isValid(pid)) {
        console.log("Invalid project ID");
        throw new BadRequestException('Project id is invalid', ErrorCode.INVALID_PROJECTID);
      }

      const existingProject = await Project.findById(pid);
      if (!existingProject) {
        throw new NotFoundException('Project not found', ErrorCode.PROJECT_NOT_FOUND);
      }
    let deletedResources = await Resource.findByIdAndDelete(rid);
    if (deletedResources) {
      // Remove the resource from the project's Resources array
      const updatedProject = await Project.findByIdAndUpdate(
        pid,
        { $pull: { Resources: rid } }, // Remove rid from the Resources array
        { new: true }
      );
    
      if (updatedProject) {
        res.json({
          message: "Resource deleted and project updated",
          resource: deletedResources,
          updatedProject
        });
      } else {
        throw new InternalException('Unable to update project after deleting resource', ErrorCode.INTERNAL_EXCEPTION);
      }
    } else {
      throw new InternalException('Unable to delete resource', ErrorCode.INTERNAL_EXCEPTION);
    }
}
