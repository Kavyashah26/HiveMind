const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleEnum = ["Monk", "Disciple"];

const projectSchema = new Schema({
  pName: {
    type: String,
    required: true,
  },
  pDescription: {
    type: String,
    required: true,
  },
  StartDate: {
    type: Date,
  },
  logo_img: {
    type: String,
  },
  githubUrl: {
    type: String,
    required: true,
  },
  teamLeader: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  waitingMembers: [
    {
      waitingMember: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  teamMembers: [
    {
      teamMember: {
        type: Schema.Types.ObjectId,
      },
      roles: {
        type: String,
        enum: roleEnum,
      },
    },
  ],
  isArchived: {
    type: Boolean,
    required: true,
  },
  liveUrl: {
    type: String,
  },
  Tags: [
    {
      type: String,
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
