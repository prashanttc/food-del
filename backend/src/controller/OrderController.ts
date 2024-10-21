import { Stripe } from "stripe";
import { Request, Response } from "express";
import Restaurant, { menuItemsType } from "../models/restaurant";
import Order from "../models/order";
const STRIPE = new Stripe(process.env.STRIPE as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

export const getMySingleOrder =async(req:Request,res:Response) =>{
  try{
   const orderid = req.params.orderid
    const order = await Order.findById(orderid).populate("user").populate("restaurant")
    res.json(order)
  }
  catch(error){
    console.log(error)
    res.status(500).json({message:"unable to laod your single order"})
  }

}

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
        const sig = req.headers["stripe-signature"];
        let event: Stripe.Event;

        // Verify the event with Stripe
        event = STRIPE.webhooks.constructEvent(
            req.body,
            sig as string,
            STRIPE_WEBHOOK_SECRET
        );

        // Handle checkout.session.completed event
        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            const orderId = session.metadata?.orderId;
            const amountTotal = session.amount_total;

            if (!orderId) {
                return res.status(400).json({ message: "Order ID not found in metadata" });
            }

            const order = await Order.findById(orderId);
            if (!order) {
                return res.status(400).json({ message: "Order not found" });
            }

            if (typeof amountTotal !== "number") {
                return res.status(400).json({ message: "Invalid amount_total value" });
            }

            // Update order status and amount
            order.totalAmount = amountTotal / 100; // Convert amount from paise to INR
            order.status = "paid";
            await order.save();

            res.status(200).send();
        } else {
            res.status(400).json({ message: "Unhandled event type" });
        }
    } catch (error: any) {
        console.error("Webhook error:", error);
        return res.status(400).send(`Webhook error: ${error.message}`);
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
      const restaurant = await Restaurant.findById(checkSessionRequest.restaurantId);
      
      if (!restaurant) {
          throw new Error("Restaurant not found");
      }

      const LineItems = createLineItems(checkSessionRequest, restaurant.menuItems);
      const deliveryPriceInPaise = Math.round(restaurant.deliveryPrice * 100);

      // Calculate total amount based on cart items and delivery
      const totalAmount = LineItems.reduce(
          (total, item) => total + (item.price_data?.unit_amount || 0) * item.quantity!,
          0
      ) + deliveryPriceInPaise;

      // Create a new order before creating the Stripe session
      const newOrder = new Order({
          restaurant: restaurant._id,
          user: req.userId,
          status: "placed",
          deliveryDetails: checkSessionRequest.deliveryDetails,
          cartItems: checkSessionRequest.cartItems,
          totalAmount: totalAmount / 100, // Store amount in INR for better readability
          createdAt: new Date(),
      });
      await newOrder.save();

      const session = await createSession(
          LineItems,
          newOrder._id.toString(),
          deliveryPriceInPaise,
          restaurant._id.toString()
      );

      if (!session.url) {
          res.status(500).json({ message: "Error creating Stripe session" });
      } else {
          res.status(200).json({ url: session.url });
      }
  } catch (error: any) {
      console.error("Checkout session error:", error);
      res.status(500).json({ message: "An error occurred while creating the checkout session" });
  }
};

const createLineItems = (
  checkSessionRequest: checkSessionRequest,
  menuItems: menuItemsType[]
): Stripe.Checkout.SessionCreateParams.LineItem[] => {
  return checkSessionRequest.cartItems.map((cartItem) => {
      const menuItem = menuItems.find(
          (item) => item._id.toString() === cartItem.menuItemId.toString()
      );
      if (!menuItem) {
          throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
      }

      return {
          price_data: {
              currency: "inr",
              unit_amount: Math.round(menuItem.price * 100), // Convert to paise
              product_data: {
                  name: menuItem.name,
              },
          },
          quantity: parseInt(cartItem.quantity),
      };
  });
};

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  deliveryPrice: number,
  restaurantId: string
) => {
  return await STRIPE.checkout.sessions.create({
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
};

