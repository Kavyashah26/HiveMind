import mongoose from "mongoose";
import Project from "../schema/project.js";
import User from "../schema/user.js";

export const createProject = async (req, res) => {
  let newProject = await Project.create({ ...req.body });
  if (newProject) {
    res.json(newProject);
  } else {
    res.status(400).json({ message: "Project is not created" });
  }
};
export const getProjectDetails = async (req, res) => {
  let { pid } = req.params;

  let projectDetail = await Project.findById(pid);

  if (projectDetail) {
    res.json(projectDetail);
  } else {
    res
      .status(400)
      .json({ message: "Project with the given id doesn't exist" });
  }
};

export const updateProjectDetails = async (req, res) => {
  let { pid } = req.params;

  let updateProjectDetails = await Project.findByIdAndUpdate(
    pid,
    { ...req.body },
    { runValidators: true, new: true }
  );

  if (updateProjectDetails) {
    res.json({
      message: "Details updated",
      projectDetails: updateProjectDetails,
    });
  } else {
    res
      .status(400)
      .json({ message: "Project with the given id doesn't exist" });
  }
};

export const deleteProject = async (req, res) => {
  let { pid } = req.params;
  let deletedProject = await Project.deleteOne({ id: pid });

  if (deletedProject) {
    res.json({
      message: "Deleted project",
    });
  } else {
    res
      .status(400)
      .json({ message: "Project with the given id doesn't exist" });
  }
};

export const getProjectOverView = async (req, res) => {
  let { pid } = req.params;

  let projectDetail = await Project.findById(pid, "liveUrl pName githubUrl");

  if (projectDetail) {
    res.json(projectDetail);
  } else {
    res
      .status(400)
      .json({ message: "Project with the given id doesn't exist" });
  }
};

export const getProjectMembers = async (req, res) => {
  let { pid } = req.params;

  let getMemberIds = await Project.findById(pid, "teamMembers");

  let teamMemberDetails = await Promise.all(
    getMemberIds.teamMembers.map(async (mem) => {
      let memberDetail = await User.findById(mem.teamMember, "name");
      if (memberDetail) {
        return {
          teamMember: mem.teamMember,
          role: mem.roles,
          name: memberDetail.name,
        };
      } else {
        res.json("Something went wrong");
      }
    })
  );

  res.json(teamMemberDetails);
};

export const addProjectMembers = async (req, res) => {
  let { pid } = req.params;
  let memberId = req.body.memberId;

  let addMember = await Project.findByIdAndUpdate(
    pid,
    { $push: { teamMembers: { teamMember: memberId } } },
    { runValidators: true, new: true }
  );

  if (addMember) {
    res.json(addMember);
  } else {
    res
      .status(400)
      .json({ message: "Project with the given id doesn't exist" });
  }
};

export const giveRoleToProjectMembers = async (req, res) => {
  let { pid } = req.params;
  let {memberId, roles} = req.body;

  let project = await Project.findById(pid);

  if(!project) {
    res.status(400).json({message:"project not found"});
  }

  let teamMember = project.teamMembers.find((tm)=>tm.teamMember.equals(memberId));
  
  if(!teamMember) {
    res.status(400).json({message:"member not found"});
  }

  teamMember.roles = roles;

  let updatedProject = await project.save();

  if(!updatedProject) {
    res.status(400).json({message:"role is not assigned"});
  }

  res.json(updatedProject);
};

export const removeProjectMembers = async (req, res) => {
    let {pid} = req.params;
    let {memberId} = req.body;

    let updatedProject = await Project.findByIdAndUpdate(pid,{$pull:{teamMembers:{teamMember:memberId}}},{runValidators:true,new:true});

    if(updatedProject) {
        res.json(updatedProject);
    } else {
        res.status(400).json({message:"Something went wrong"});
    }
};
