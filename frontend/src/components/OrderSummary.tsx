import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/type"
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
    restaurant: Restaurant;
    cartItems: CartItem[];
    removefromCart :(cartItem:CartItem)=> void
}

const OrderSummary = ({ restaurant, cartItems , removefromCart }: Props) => {

    const GetTotalCost=()=>{
        const total = cartItems.reduce((total,cartItem , )=>
            total + cartItem.price *  cartItem.quantity, 0
        )
        const totalwithDelivery = total + restaurant.deliveryPrice;
        return (totalwithDelivery)
    } 
    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tighter flex justify-between">
                    <span>your order</span>
                    <span>₹{GetTotalCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((item) => (
                    <div className="flex justify-between">
                        <span>
                            <Badge variant="outline" className="mr-2">
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <Trash className="cursor-pointer" color="red" size={20} onClick={()=>removefromCart(item)}/>
                        ₹{item.price * item.quantity}
                        </span>
                    </div>
                ))}
                <Separator/>
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>₹{restaurant.deliveryPrice}</span>
                </div>
                <Separator/>
            </CardContent>
        </>
    )
}

export default OrderSummary
