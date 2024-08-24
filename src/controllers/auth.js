// import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schema/user.js";
// import { JWT_SECRET } from "../secrets";

const JWT_SECRET = "abcdef";

export const signup = async (req, res, next) => {
  // signupSchema.parse(req.body)
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
  const hashedPassword = hashSync(password, 10);
  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  // const user={};
  res.json(user);
};

export const login = async (req, res, next) => {
  // loginSchema.parse(req.body)

  const { email, password } = req.body;
  console.log(email, password);

  const user = {
    id: 123,
    password: 123,
  };
  // let user=await prismaClient.user.findFirst({
  //     where:{email}
  // })
  user = await User.findOne({ email: email });

  if (!user) {
    // return user not found
  }

  // if(!compareSync(password,user.password)){
  //     //return incorrect password
  // }
  console.log("pre jwt");

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );
  console.log("jwt");

  res.json({ user, token });
};

export const me = async (req, res, next) => {
  res.json(req.user);
};
