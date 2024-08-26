import Resource from "../schema/resource.js";

export const createResource = async (req, res) => {

  const resourceBody = {
    name:req.body.name,
    link:req.body.link,
    resourceType:req.body.resourceType,
  }
  const newResource = await Resource.create(resourceBody);
  

  if (newResource) {
    res.json(newResource);
  } else {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateResource = async (req, res) => {
  let { rid } = req.params;
  let updatedField = req.body;
  let updatedResource = await Resource.findByIdAndUpdate(
    rid,
    { $set: updatedField },
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
  let { rid } = req.params;
  let deletedResources = await Resource.findByIdAndDelete(rid);
  if (deleteResource) {
    res.json({ message: "Resource deleted", resource: deletedResources });
  } else {
    res.status(404).json({ message: "Something went wrong" });
  }
};
