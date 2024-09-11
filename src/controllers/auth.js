// import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schema/user.js";
// import { JWT_SECRET } from "../secrets";

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
    // let u=await User.find({});
    // console.log(u);
    console.log(req.user);
    
    res.json(req.user);
};
