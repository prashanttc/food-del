import { useGetMyOrder } from "@/api/OrderApi"
import OrderDetail from "@/components/OrderDetail"
import OrderStatusHeader from "@/components/OrderStatusHeader"
import { AspectRatio } from "@/components/ui/aspect-ratio"


const OrderPage = () => {
    const{orders,isLoading} = useGetMyOrder()
    if(isLoading){
        return "loading...."
    }
    if(!orders || orders.length === 0){
        return "no order found"
    }
  return (
    <div className="space-y-10">
        {orders.map((order)=>(
            <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
                <OrderStatusHeader  order={order}/>
          <div className="grid md:grid-cols-2 gap-10">
            <OrderDetail order={order}/>
            <AspectRatio ratio={16/5}>
            <img src={order.restaurant.imageUrl} className="rounded-md object-cover h-full w-full" /></AspectRatio>
          </div>
            </div>
        ))}
      
    </div>
  )
}

export default OrderPage
