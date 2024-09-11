import User from "../schema/user.js";
import { ErrorCode } from "../exceptions/root.js";
import mongoose from "mongoose";
import { NotFoundException } from "../exceptions/not-found.js";
import { InternalException } from "../exceptions/internal-exception.js";
import { BadRequestException } from "../exceptions/bad-request.js";

export const deleteUser = async (req, res) => {
  let { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new BadRequestException(
      "User id is invalid",
      ErrorCode.INVALID_USERID
    );
  }

  if (req.user.id.toString() != userId) {
    throw new BadRequestException(
      "You can't delete other user account",
      ErrorCode.MISCELLANEOUS_ERROR
    );
  }

  let currUser = await User.findById(userId);
  if (!currUser) {
    throw new NotFoundException("User not exist", ErrorCode.USER_NOT_FOUND);
  }

  let delUser = await User.findByIdAndDelete(userId);
  if (!delUser) {
    throw new InternalException(
      "User is not deleted",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
  res.json({ message: "User deleted successfully", deletedUser: delUser });
};

export const updateUser = async (req, res) => {
  let { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new BadRequestException(
      "user id is invalid",
      ErrorCode.INVALID_USERID
    );
  }

  if (req.user.id.toString() != userId) {
    throw new BadRequestException(
      "You can't change details of another user",
      ErrorCode.MISCELLANEOUS_ERROR
    );
  }

  let currUser = await User.findById(userId);
  if (!currUser) {
    throw new NotFoundException("User not exist", ErrorCode.USER_NOT_FOUND);
  }

  let curr_links = currUser.links || {};
  curr_links = { ...curr_links, ...req.body.links };
  const updatedFields = {};
  if (req.body.name) updatedFields.name = req.body.name;
  if (req.body.email) updatedFields.email = req.body.email;
  updatedFields.links = curr_links;

  let updateUserDetail = await User.findByIdAndUpdate(userId, updatedFields, {
    runValidators: true,
    new: true,
  });
  if (!updateUserDetail) {
    throw new InternalException(
      "User is not updated",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
  res.json({ message: "UserDetails updated", UserDetail: updateUserDetail });
};

export const getUser = async (req, res) => {
  let { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new BadRequestException(
      "User id is invalid",
      ErrorCode.INVALID_USERID
    );
  }

  let currUser = await User.findById(userId);
  if (!currUser) {
    throw new NotFoundException(
      "Doesn't able to fetch user",
      ErrorCode.USER_NOT_FOUND
    );
  }

  res.json(currUser);
};