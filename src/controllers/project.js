import mongoose from "mongoose";
import Project from "../schema/project.js";
import User from "../schema/user.js";

export const createProject = async (req, res) => {
  try {
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

    if(newProject) {
      let user = await User.findById(req.user.id);
      const validProjectId = mongoose.Types.ObjectId(newProject.id);
      user.adminAt.push(validProjectId);
      user.save();
    } else {
      res.status(400).json({ message: "Project id doesn't store in user details" });
    }

    if (newProject) {
      res.json(newProject);
    } else {
      res.status(400).json({ message: "Project is not created" });
    }
  } catch (error) {
    throw error;
  }
};
 
export const getProjectDetails = async (req, res) => {
  try {
    const { pid } = req.params;

    let projectDetail = await Project.findById(pid);

    if (projectDetail) {
      res.json(projectDetail);
    } else {
      res
        .status(400)
        .json({ message: "Project with the given id doesn't exist" });
    }
  } catch (error) {
    throw error;
  }
};

export const updateProjectDetails = async (req, res) => {
  try {
    const { pid } = req.params;

    const details = {
      pName: req.body.pName,
      pDescription: req.body.pDescription,
      logo_img: req.body.logo_img,
      isArchived: req.body.isArchived,
      liveUrl: req.body.liveUrl,
      Tags: req.body.Tags,
    };

    let updateProjectDetails = await Project.findByIdAndUpdate(
      pid,
      details,
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
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { pid } = req.params;
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
  } catch (error) {
    throw error;
  }
};

export const getProjectOverView = async (req, res) => {
  try {
    const { pid } = req.params;

    let projectDetail = await Project.findById(pid, "liveUrl pName githubUrl");

    if (projectDetail) {
      res.json(projectDetail);
    } else {
      res
        .status(400)
        .json({ message: "Project with the given id doesn't exist" });
    }
  } catch (error) {
    throw error;
  }
};

export const getProjectMembers = async (req, res) => {
  try {
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
          res.json("Something went wrong");
        }
      })
    );
    res.json(teamMemberDetails);
  } catch (error) {
    throw error;
  }
};

export const addProjectMembers = async (req, res) => {
  try {
    const { pid } = req.params;
    const memberId = req.body.memberId;
    let user = await User.findById(memberId);
    if(!user) {
      res
        .status(400)
        .json({ message: "Project with the given id doesn't exist" });
    }

    let addMember = await Project.findByIdAndUpdate(
      pid,
      { $push: { teamMembers: { teamMember: memberId } } },
      { runValidators: true, new: true }
    );

    if(addMember) {
      let cpid = mongoose.Types.ObjectId(pid);
      user.memberOf.push(cpid);
      user.save();
    }

    if (addMember) {
      res.json(addMember);
    } else {
      res
        .status(400)
        .json({ message: "Member is not added in project" });
    }
  } catch (error) {
    throw error;
  }
};

export const giveRoleToProjectMembers = async (req, res) => {
  try {
    const { pid } = req.params;
    const memberId = req.body.memberId;
    const roles = req.body.roles;

    let project = await Project.findById(pid);

    if (!project) {
      res.status(400).json({ message: "project not found" });
    }

    let teamMember = project.teamMembers.find((tm) =>
      tm.teamMember.equals(memberId)
    );

    if (!teamMember) {
      res.status(400).json({ message: "member not found" });
    }

    teamMember.roles = roles;

    const updatedProject = await project.save();

    if (!updatedProject) {
      res.status(400).json({ message: "role is not assigned" });
    }

    res.json(updatedProject);
  } catch (error) {
    throw error;
  }
};

export const removeProjectMembers = async (req, res) => {
  try {
    const { pid } = req.params;
    const memberId = req.body.memberId;

    let updatedProject = await Project.findByIdAndUpdate(
      pid,
      { $pull: { teamMembers: { teamMember: memberId } } },
      { runValidators: true, new: true }
    );

    if(updateProject) {
      let user = await User.findById(memberId);
      let cpid = mongoose.Types.ObjectId(pid);
      user.memberOf.pull(cpid);
      await user.save()
    } else {
      res.status(400).json({ message: "" });
    }

    if (updatedProject) {
      res.json(updatedProject);
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    throw error;
  }
};
