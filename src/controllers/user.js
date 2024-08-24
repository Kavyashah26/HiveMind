import User from "../schema/user.js";

export const deleteUser = async (req, res) => {
  let { userId } = req.params;
  let delUser = await User.findByIdAndDelete(userId);
  if (!delUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ message: "User deleted successfully", deletedUser: delUser });
};

export const updateUser = async (req, res) => {
  let { userId } = req.params;
  const updatedFields = req.body;
  let updateUserDetail = await User.findByIdAndUpdate(
    userId,
    { $set: updatedFields },
    { runValidators: true, new: true }
  );
  if (!updateUserDetail) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ message: "UserDetails updated", UserDetail: updateUserDetail });
};

export const getUser = async (req, res) => {
  let { userId } = req.params;
  let UserDetail = await User.findById(userId);
  if (!UserDetail) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(UserDetail);
};
