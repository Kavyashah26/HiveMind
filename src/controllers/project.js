import mongoose from "mongoose";
import Project from "../schema/project.js";
import User from "../schema/user.js";

import { NotFoundException } from "../exceptions/not-found.js";

import { BadRequestException } from "../exceptions/bad-request.js";
import { InternalException } from "../exceptions/internal-exception.js";
import { ErrorCode } from "../exceptions/root.js";

export const createProject = async (req, res) => {
  let user = await User.findById(req.user.id);
  if (!user) {
    throw new NotFoundException("User not found.", ErrorCode.USER_NOT_FOUND);
  }
  const details = {
    pName: req.body.pName,
    pDescription: req.body.pDescription,
    StartDate: req.body.StartDate,
    logo_img: req.body.logo_img,
    githubUrl: req.body.githubUrl,
    teamLeader: req.user?.id,
    isArchived: req.body.isArchived,
    liveUrl: req.body.liveUrl, //optional
    Tags: req.body.Tags,
  };
  let newProject = await Project.create(details);

  if (newProject) {
    const validProjectId = new mongoose.Types.ObjectId(newProject.id);
    user.adminAt.push(validProjectId);
    user.save();
  } else {
    res
      .status(400)
      .json({ message: "Project id doesn't store in user details" });
  }

  if (newProject) {
    res.json(newProject);
  } else {
    // res.status(400).json({ message: "Project is not created" });
    throw new InternalException(
      "Unable to create Project",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
};

export const getProjectDetails = async (req, res) => {
  const { pid } = req.params;
  let projectDetail;
  try {
    projectDetail = await Project.findById(pid);
  } catch (error) {
    throw new InternalException(
      "Unable to get Project details",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }

  if (projectDetail) {
    res.json(projectDetail);
  } else {
    throw new NotFoundException(
      "Project not found.",
      ErrorCode.PROJECT_NOT_FOUND
    );
  }
};

export const updateProjectDetails = async (req, res) => {
  try {
    const { pid } = req.params;
    let projectdt = await Project.findById(pid);
    let tagarr = projectdt.Tags;
    tagarr = [...tagarr, ...req.body.Tags];
    tagarr = [...new Set(tagarr)];
    const details = {
      pName: req.body.pName,
      pDescription: req.body.pDescription,
      logo_img: req.body.logo_img,
      isArchived: req.body.isArchived,
      liveUrl: req.body.liveUrl,
      Tags: tagarr, // give new tag
    };

    let updateProjectDetails = await Project.findByIdAndUpdate(pid, details, {
      runValidators: true,
      new: true,
    });

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
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { pid } = req.params;

    let deletedProject = await Project.findByIdAndDelete(pid);
    let admin = await User.findById(deletedProject.teamLeader);
    console.log("hello\t");
    let cid = new mongoose.Types.ObjectId(pid);
    admin.adminAt.pull(cid);
    await admin.save();
    console.log("fkefnekfnke", admin, "dededed");

    if (deletedProject) {
      res.json({
        message: "Deleted project",
      });
    } else {
      throw new NotFoundException(
        "Project not found",
        ErrorCode.PROJECT_NOT_FOUND
      );
    }
  } catch (error) {
    throw error;
  }
};

export const getProjectOverView = async (req, res) => {
  // try {
  const { pid } = req.params;
  if (!mongoose.Types.ObjectId.isValid(pid)) {
    console.log("\t\t\tInvalid");
    throw new BadRequestException(
      "Project id is invalid",
      ErrorCode.INVALID_PROJECTID
    );
    // throw new BadRequestException("Project id is invalid",ErrorCode.INVALID_PROJECTID)
    console.log("After bad request");
  } else {
    const objectId = new mongoose.Types.ObjectId(pid);
    let projectDetail = await Project.findById(
      objectId,
      "liveUrl pName githubUrl"
    );

    if (projectDetail) {
      res.json(projectDetail);
    } else {
      res
        .status(400)
        .json({ message: "Project with the given id doesn't exist" });
    }
  }
};

export const getProjectMembers = async (req, res) => {
  const { pid } = req.params;

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
        throw new NotFoundException(
          "Memebr not found.",
          ErrorCode.USER_NOT_FOUND
        );
      }
    })
  );
  res.json(teamMemberDetails);
};

export const addProjectMembers = async (req, res) => {
  const { pid } = req.params;
  const mID = req.body.memberId;
  if (!mongoose.Types.ObjectId.isValid(mID)) {
    console.log("\t\t\tInvalid");
    throw new BadRequestException(
      "Project id is invalid",
      ErrorCode.INVALID_PROJECTID
    );
    // throw new BadRequestException("Project id is invalid",ErrorCode.INVALID_PROJECTID)
    console.log("After bad request");
  }
  const memberId = new mongoose.Types.ObjectId(mID);

  let user = await User.findById(memberId);
  if (!user) {
    throw new NotFoundException("User not found.", ErrorCode.USER_NOT_FOUND);
  }
  let project = await Project.findById(pid);
  const existingMember = project.teamMembers.find(
    (member) => member.teamMember.toString() === memberId.toString()
  );

  if (existingMember) {
    throw new BadRequestException(
      "USER WITH GIVEN ID ALREADY EXIST",
      ErrorCode.USER_ALREADY_EXIST_IN_PROJECT
    );
  }

  let addMember = await Project.findByIdAndUpdate(
    pid,
    { $push: { teamMembers: { teamMember: memberId, roles: "Monk" } } },
    { runValidators: true, new: true }
  );

  if (addMember) {
    let cpid = new mongoose.Types.ObjectId(pid);
    user.memberOf.push(cpid);
    await user.save();
  }

  if (addMember) {
    res.json(addMember);
  } else {
    throw new InternalException(
      "Unable to Add member to Project",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
};

export const giveRoleToProjectMembers = async (req, res) => {
  const { pid } = req.params;
  const memberId = req.body.memberId;
  const roles = req.body.roles;

  let project = await Project.findById(pid);

  if (!project) {
    throw new NotFoundException(
      "Project not found.",
      ErrorCode.PROJECT_NOT_FOUND
    );
  }

  let teamMember = project.teamMembers.find((tm) =>
    tm.teamMember.equals(memberId)
  );

  if (!teamMember) {
    throw new NotFoundException("Member not found.", ErrorCode.USER_NOT_FOUND);
  }

  teamMember.roles = roles;

  const updatedProject = await project.save();

  if (!updatedProject) {
    throw new InternalException(
      "Unable to assign role",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }

  res.json(updatedProject);
};

export const removeProjectMembers = async (req, res) => {
  const { pid } = req.params;
  const memberId = req.body.memberId;

  let project = await Project.findById(pid);

  if (!project) {
    throw new NotFoundException(
      "Project not found.",
      ErrorCode.PROJECT_NOT_FOUND
    );
  }

  let member = await User.findById(memberId);
  if (!member) {
    throw new NotFoundException(
      "Member not found.",
      ErrorCode.MEMEBER_NOT_FOUND
    );
  }

  const existingMember = project.teamMembers.find(
    (mem) => mem.teamMember.toString() === memberId.toString()
  );
  if (!existingMember) {
    throw new NotFoundException(
      "Given member not exist in project.",
      ErrorCode.MEMEBER_NOT_FOUND
    );
  }

  let updatedProject = await Project.findByIdAndUpdate(
    pid,
    { $pull: { teamMembers: { teamMember: memberId } } },
    { runValidators: true, new: true }
  );

  if (updatedProject) {
    let user = await User.findById(memberId);
    let cpid = new mongoose.Types.ObjectId(pid);
    user.memberOf.pull(cpid);
    await user.save();
  } else {
    throw new InternalException(
      "Unable to remove projectid in user detail",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }

  if (updatedProject) {
    res.json(updatedProject);
  } else {
    throw new InternalException(
      "Unable remove member from project",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
};

export const getAllProjectDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    let user = await User.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found.", ErrorCode.USER_NOT_FOUND);
    }

    let projects = await Project.find({
      $and: [
        { teamLeader: { $ne: userId } },
        { "teamMembers.teamMember": { $ne: userId } },
      ],
    }).select("pName pDescription githubUrl liveUrl Tags");

    if (!projects) {
      throw new NotFoundException(
        "Project not found.",
        ErrorCode.PROJECT_NOT_FOUND
      );
    }

    res.json({ projects });
  } catch (error) {
    console.error(error);
    throw new NotFoundException(
      "Project not found.",
      ErrorCode.PROJECT_NOT_FOUND
    );
  }
};

export const getProjectOfMember = async (req, res) => {
  try {
    const userId = req.user.id;

    let user = await User.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found.", ErrorCode.USER_NOT_FOUND);
    }

    let projects = await Project.find({
      "teamMembers.teamMember": userId,
    }).select("pName pDescription githubUrl liveUrl Tags");

    if (!projects) {
      throw new NotFoundException(
        "Project not found.",
        ErrorCode.PROJECT_NOT_FOUND
      );
    }

    res.json({ projects });
  } catch (error) {
    console.error(error);
    throw new NotFoundException(
      "Project not found.",
      ErrorCode.PROJECT_NOT_FOUND
    );
  }
};

export const getProjectOfAdmin = async (req, res) => {
  try {
    const userId = req.user.id;

    let user = await User.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found.", ErrorCode.USER_NOT_FOUND);
    }

    let projects = await Project.find({
      teamLeader: userId,
    }).select("pName pDescription githubUrl liveUrl Tags");

    if (!projects) {
      throw new NotFoundException(
        "Project not found.",
        ErrorCode.PROJECT_NOT_FOUND
      );
    }

    res.json({ projects });
  } catch (error) {
    console.error(error);
    throw new NotFoundException(
      "Project not found.",
      ErrorCode.PROJECT_NOT_FOUND
    );
  }
};

export const requestToJoin = async (req, res) => {
  const { pid } = req.params;
  const userId = req.user.id;
  const project = await Project.findById(pid);

  console.log(project);
  if (!project) {
    throw new NotFoundException(
      "Project not found.",
      ErrorCode.PROJECT_NOT_FOUND
    );
  }

  console.log("before bad request");
  const isAlreadyWaiting = project.waitingMembers.some(
    (member) => member.waitingMember.toString() === userId.toString()
  );
  console.log("after bad request");
  console.log(isAlreadyWaiting);
  if (isAlreadyWaiting) {
    throw new BadRequestException(
      "User is already in the waiting list.",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }

  console.log("before pushing");
  // Add userId to waitingMembers
  project.waitingMembers.push({ waitingMember: userId });
  console.log("after pushing");
  // Save the updated project
  await project.save();
  res.json({ project });
};
