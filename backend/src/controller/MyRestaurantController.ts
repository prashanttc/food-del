import { Response, Request } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

export const CreateMyResturant = async (req: Request, res: Response) => {
  try {
    const imageUrl = await uploadImage(req.file as Express.Multer.File);
    const exsistingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (exsistingRestaurant) {
      return res.status(409).json({ message: "restaurant already exists" });
    }
    const restaurant = new Restaurant(req.body);
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.imageUrl = imageUrl;
    restaurant.lastUpdated = new Date();
    await restaurant.save();

    res.status(201).send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong!!" });
  }
};

export const UpdateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({
      user: req.userId,
    });
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }
    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.estimatedTime = req.body.estimatedTime;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();
    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }
    await restaurant.save();

    res.status(201).send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong!!" });
  }
};

export const GetMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
     return res.status(404).json({ message: "restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error fetching resaturant" });
  }
};
