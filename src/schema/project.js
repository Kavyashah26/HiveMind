import Resource from "./resource.js";
import mongoose from "mongoose";
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
     name: {
       type: Schema.Types.String
     }
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
     name: {
       type: Schema.Types.String
     }
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
 Resources: [
   {
     type: Schema.Types.ObjectId,
     ref: "Resource",
   }
 ]
});


const Project = mongoose.model("Project", projectSchema);


export default Project;