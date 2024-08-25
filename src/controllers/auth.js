// import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schema/user.js";
// import { JWT_SECRET } from "../secrets";


export const signup = async (req, res, next) => {
  // signupSchema.parse(req.body)
  const JWT_SECRET = process.env.JWT_SECRET || "abcdef";
  const { name, email, password } = req.body;

  //     let user=await prismaClient.user.findFirst({
  //         where:{email}
  //     })
  let user = await User.findOne({ email: email });
  //   //check if user already exist
  //     user=await prismaClient.user.create({
  //         data:{
  //             name,
  //             email,
  //             password:hashSync(password,10)
  //         }
  //     })
  // if(user){
  //   res.json({"error":"User already exist"});
  // }

  const hashedPassword = hashSync(password, 10);
  user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // console.log(user);
  // const user={};
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


//   if (!user) {
//     // return user not found
//   }

  // if(!compareSync(password,user.password)){
  //     //return incorrect password
  //     res.json({"error":"Incorrect password"})
  // }
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
    let u=await User.find({});
    console.log(u);
    res.json(req.user);
  
};
