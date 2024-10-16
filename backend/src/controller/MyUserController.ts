import { Request, Response } from "express";
import User from "../models/user";

export const CreateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).send({ message: "user already exists" });
    }
    const NewUser = new User(req.body);
    await NewUser.save();
    res.status(201).json(NewUser.toObject());
  } catch (err) {
    console.log(err);
    res.status(505).json({ message: "error creating user" });
  }
};

export const UpdateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, city } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;

    await user.save();
    res.send(user);
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error updating user" });
  }
};

export const GetCurrentUser = async(req:Request , res:Response)=>{
  try{
    const currentUser = await User.findOne({_id: req.userId})
    if(!currentUser){
      return res.status(404).json({message:"User not found"})
    }
    res.json(currentUser)
  }
  catch(error){
    console.log(error)
    res.status(500).json({message:"something went wrong"})
  }
}