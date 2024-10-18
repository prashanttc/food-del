import mongoose, { InferSchemaType } from "mongoose";

const menuItemSchema = new mongoose.Schema({
  _id:{type:mongoose.Schema.Types.ObjectId, required:true,default:()=> new mongoose.Types.ObjectId()},
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export type menuItemsType  = InferSchemaType<typeof menuItemSchema>
const RestaurantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  restaurantName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  deliveryPrice: {
    type: Number,
    required: true,
  },
  estimatedTime: {
    type: Number,
    required: true,
  },
  cuisines: [
    {
      type: String,
      required: true,
    },
  ],
  menuItems: [menuItemSchema],
  imageUrl: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
  },
});

const Restaurant = mongoose.model("Restaurant",RestaurantSchema)
export default Restaurant;