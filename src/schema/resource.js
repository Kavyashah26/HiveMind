import mongoose from "mongoose";
const Schema = mongoose.Schema;

const typeEnum = ["jpg", "png", "pdf", "link"];

const resourceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  resourceType: {
    type: String,
    enum: typeEnum,
    required: true,
  },
});

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
