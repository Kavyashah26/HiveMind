import Project from "../schema/project.js";
import Resource from "../schema/resource.js";

export const createResource = async (req, res) => {
  try {
    const pid = req.body.pid;
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
      res.status(404).json({ message: "Something went wrong" });
    }
  } catch (error) {
    throw error;
  }
};

export const updateResource = async (req, res) => {
  const { rid } = req.params;
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
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const { rid } = req.params;
    let deletedResources = await Resource.findByIdAndDelete(rid);
    if (deleteResource) {
      res.json({ message: "Resource deleted", resource: deletedResources });
    } else {
      res.status(404).json({ message: "Something went wrong" });
    } 
  } catch (error) {
    throw error;
  }
};
