import { Order } from "@/type"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"

type Props={
    order:Order
}
const OrderDetail = ({order}:Props) => {
   return (
    <div className="space-y-5">
        <div className="flex flex-col">
            <span className="font-bold">Delivering to:</span>
            <span>{order.deliveryDetails.name}</span>
            <span>{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}</span>
        </div>
        <div className="flex flex-col">
<span className="font-bold">Your Order</span>
<ul>
    {order.cartItems.map((item)=>(
        <li>
            {item.name} x{item.quantity}
        </li>
    ))}
</ul>
        </div>
        <Separator/>
        <div className="flex flex-col">
            <span className="text-bold">Total</span>
            <span>{order.totalAmount} rupees</span>
        </div>
        <Separator/>
        <Button variant="ghost" className="bg-orange-500 text-white hover:bg-orange-600 hover:text-white">cancel order</Button>
      
    </div>
  )
}

export default OrderDetail
