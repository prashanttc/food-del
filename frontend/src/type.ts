export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  deliveryPrice: number;
  estimatedTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type SearchRestaurant = {
  data:Restaurant[];
  pagination:{
    pages:number;
    page:number;
    total:number;
  }
}
export type OrderStatus =
  |"placed"
  |"paid"
  |"outForDelivery"
  |"inProgress"
  |"delivered";

export type Order ={
  _id:string;
  restaurant:Restaurant;
  user:User;
  cartItems:{
    menuItemId:string;
    name:string;
    quantity:string;
  }[],
  deliveryDetails:{
    name:string;
    addressLine1:string;
    city:string;
    email:string;
  },
  totalAmount:number;
  status:OrderStatus;
  createdAt:string;
  restaurantId:string;
}