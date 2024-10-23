// import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schema/user.js";
// import { JWT_SECRET } from "../secrets";
import Project from "../schema/project.js";
import { BadRequestException } from "../exceptions/bad-request.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { ErrorCode } from "../exceptions/root.js";

export const signup = async (req, res, next) => {
  // signupSchema.parse(req.body)
  const JWT_SECRET = process.env.JWT_SECRET || "abcdef";
  const { name, email, password } = req.body;

  //     let user=await prismaClient.user.findFirst({
  //         where:{email}
  //     })
  console.log("Before find");
  
  let user = await User.findOne({ email: email });
  
  console.log("after find");
  //   //check if user already exist
  //     user=await prismaClient.user.create({
  //         data:{
  //             name,
  //             email,
  //             password:hashSync(password,10)
  //         }
  //     })
  // console.log(user);
  
  if(user){
    // console.log("In user");
    
    throw new BadRequestException('User already exist',ErrorCode.USER_ALREADY_EXIST )
    // console.log("After user");
    
  }
  console.log("before hashsync");
  
  const hashedPassword = hashSync(password, 10);
  console.log("hash",hashedPassword);
  
  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  console.log("after hashsync");

  res.json(user);
};

export const login = async (req, res, next) => {
  // loginSchema.parse(req.body)
  // console.log(process.env.JWT_SECRET);
  
  const JWT_SECRET = process.env.JWT_SECRET || "abcdef";
console.log(JWT_SECRET);

  const { email, password } = req.body;
  console.log(email, password);

//   const user = {
//     id: 123,
//     password: 123,
//   };
//   // let user=await prismaClient.user.findFirst({
//   //     where:{email}
//   // })
  
//   console.log("pre find");
  let user = await User.findOne({email});
//   console.log("end find");
console.log("User",user);

  if(!user){
    console.log("!user");
    throw new NotFoundException('User not found.',ErrorCode.USER_NOT_FOUND);
  }
  console.log("before compare sync");
  
  console.log(password);
  console.log(user.password);

  
  if(!compareSync(password,user.password)){
      //return incorrect password
      console.log("Incorrrect password");
      res.json({"error":"Incorrect password"})
  }
  console.log("pre jwt");

  const token = jwt.sign(
    {
      email:user.email
    },
    JWT_SECRET
  );
  console.log("jwt");

  res.json({ user, token });

// const { email, password } = req.body;
//   console.log(email, password);

  
//   let user = await User.find({email});
//   console.log(user);
  
};

export const me = async (req, res, next) => {
  try {
      // Log the user information
      console.log(req.user);

      // Fetch the user data
      const user = req.user;

      // Create a new object to hold the modified user details
      const userDetails = { ...user.toObject() }; // Copy user object to avoid mutation

      // Fetch project details for memberOf
      userDetails.memberOf = await Promise.all(
          user.memberOf.map(async (projectId) => {
              const project = await Project.findById(projectId).select('pName githubUrl liveUrl'); // Fetch specific fields
              return {
                  id: projectId,
                  name: project ? project.pName : null,
                  githubUrl: project ? project.githubUrl : null,
                  liveUrl: project ? project.liveUrl : null,
              };
          })
      );

      // Fetch project details for adminAt
      userDetails.adminAt = await Promise.all(
          user.adminAt.map(async (projectId) => {
              const project = await Project.findById(projectId).select('pName githubUrl liveUrl'); // Fetch specific fields
              return {
                  id: projectId,
                  name: project ? project.pName : null,
                  githubUrl: project ? project.githubUrl : null,
                  liveUrl: project ? project.liveUrl : null,
              };
          })
      );

      // Respond with the modified user details
      res.json(userDetails);
  } catch (error) {
      console.error("Error fetching user details:", error);
      next(error); // Pass the error to the error-handling middleware
  }
};