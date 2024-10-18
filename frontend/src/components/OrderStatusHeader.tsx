import { Order } from "@/type"
import { Progress } from "./ui/progress"
import { ORDER_STATUS } from "@/config/order-status-config"

type Props={
    order: Order
}

const OrderStatusHeader = ({order}:Props) => {
  const OrderInfo = ()=>{
    return(
        ORDER_STATUS.find((o)=>o.value === order.status) || ORDER_STATUS[0]
    )
  }
    const getExpectedDelivery =()=>{
            const created = new Date(order.createdAt)
            created.setMinutes(created.getMinutes() + order.restaurant.estimatedTime );
            const hours = created.getHours();
            const minutes = created.getMinutes();
            const paddedMinutes = minutes< 10?`0${minutes}`:minutes;
            return `${hours}:${paddedMinutes}`;
    }
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span>Order Status: {OrderInfo().label}</span>
        <span>Expected by: {getExpectedDelivery()}</span>
      </h1>
      <Progress className="animate-pulse" value={OrderInfo().progressValue}/>
    </>
  )
}

export default OrderStatusHeader
