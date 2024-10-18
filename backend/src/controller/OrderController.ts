import { Stripe } from "stripe";
import { Request, Response } from "express";
import Restaurant, { menuItemsType } from "../models/restaurant";
import Order from "../models/order";
const STRIPE = new Stripe(process.env.STRIPE as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

export const getMyOrder = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate("user")
      .populate("restaurant");
    res.json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "unknown error occured" });
  }
};

export const webhookHandler = async (req: Request, res: Response) => {
  try {
    let event;
    const sig = req.headers["stripe-signature"];
    event = STRIPE.webhooks.constructEvent(
      req.body,
      sig as string,
      STRIPE_WEBHOOK_SECRET
    );
    if (event.type === "checkout.session.completed") {
      const order = await Order.findById(event.data.object.metadata?.orderId);
      if (!order) {
        return res.status(400).json({ message: "order not found" });
      }
      const amountTotal = event.data.object.amount_total;
      if (typeof amountTotal !== "number") {
        return res.status(400).json({ message: "Invalid amount_total value" });
      }
      order.totalAmount = amountTotal / 100;
      order.status = "paid";
      await order.save();
    }
    res.status(200).send();
  } catch (error: any) {
    console.log(error);
    return res.status(400).send(`webhook error:${error.message}`);
  }
};

type checkSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkSessionRequest: checkSessionRequest = req.body;
    const restaurant = await Restaurant.findById(
      checkSessionRequest.restaurantId
    );
    const newOrder = new Order({
      restaurant: restaurant,
      user: req.userId,
      status: "placed",
      deliveryDetails: checkSessionRequest.deliveryDetails,
      cartItems: checkSessionRequest.cartItems,
      createdAt: new Date(),
    });
    if (!restaurant) {
      throw new Error("restaurant not found");
    }
    const LineItems = createLineItems(
      checkSessionRequest,
      restaurant.menuItems
    );
    const deliveryPriceInPaise = Math.round(restaurant.deliveryPrice * 100); // Convert to paise
    console.log("Delivery Price in Paise:", deliveryPriceInPaise);
    const session = await createSession(
      LineItems,
      newOrder._id.toString(),
      deliveryPriceInPaise,
      restaurant._id.toString()
    );
    if (!session.url) {
      res.status(500).json({ message: "error creating stripe session" });
    }
    await newOrder.save();
    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "sorry" });
  }
};
const createLineItems = (
  checkSessionRequest: checkSessionRequest,
  menuItems: menuItemsType[]
) => {
  const LineItems = checkSessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item) => item._id.toString() === cartItem.menuItemId.toString()
    );
    if (!menuItem) {
      throw new Error(`menu item not found:${cartItem.menuItemId}`);
    }
    const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "inr",
        unit_amount: Math.round(menuItem.price * 100),
        product_data: {
          name: menuItem.name,
        },
      },
      quantity: parseInt(cartItem.quantity),
    };
    return line_item;
  });
  return LineItems;
};

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  deliveryPrice: number,
  restaurantId: string
) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: {
            amount: deliveryPrice,
            currency: "inr",
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      orderId,
      restaurantId,
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/details/${restaurantId}?cancelled=true`,
  });
  return sessionData;
};
