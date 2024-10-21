import { Order, OrderStatus } from "@/type"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"
import { Badge } from "./ui/badge"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ORDER_STATUS } from "@/config/order-status-config"
import { useUpdateMyOrderStatus } from "@/api/MyRestaurantApi"
import { useEffect, useState } from "react"

type Props = {
    order: Order
}

const OrderCard = ({ order }: Props) => {
    const { updateRestaurantStatus, isLoading } = useUpdateMyOrderStatus()
    const [status, setStatus] = useState<OrderStatus>(order.status)
    useEffect(() => {
        setStatus(order.status)
    }, [order.status]);
    const handleStatusChange = async (newStatus: OrderStatus) => {
        await updateRestaurantStatus({ orderId: order._id as string, status: newStatus });
        setStatus(newStatus)
    }
    const getTime = () => {
        const orderDateTime = new Date(order.createdAt)
        const hours = orderDateTime.getHours();
        const minutes = orderDateTime.getMinutes();
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${paddedMinutes}`;
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
                    <div>
                        Customer Name:
                        <span className="ml-1 font-normal">
                            {order.deliveryDetails.name}
                        </span>
                    </div>
                    <div>
                        Delivery Address:
                        <span className="ml-1 font-normal">
                            {order.deliveryDetails.addressLine1}
                        </span>
                    </div>
                    <div>
                        Time:
                        <span className="ml-1 font-normal">
                            {getTime()}
                        </span>
                    </div>
                    <div>
                        Total cost:
                        <span className="ml-1 font-normal">
                            {(order.totalAmount).toFixed(2)}
                        </span>
                    </div>
                </CardTitle>
                <Separator />
            </CardHeader>

            <CardContent className="felx flex-col gap-6 ">
                <div className="flex flex-col gap-2">
                    {order.cartItems.map((cartItem) => (
                        <span>
                            <Badge variant="outline" className="mr-2">{cartItem.quantity}</Badge>
                            {cartItem.name}
                        </span>
                    ))}
                </div>
                <div className=" flex flex-col space-y-1.5 mt-5 mb-2">
                    <Label htmlFor="status">what is the status  of this order</Label>
                    <Select value={status} onValueChange={(value) => handleStatusChange(value as OrderStatus)} disabled={isLoading}>
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {ORDER_STATUS.map((Status) => (
                                <SelectItem value={Status.value}>
                                    {Status.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

            </CardContent>
        </Card>
    )
}

export default OrderCard
