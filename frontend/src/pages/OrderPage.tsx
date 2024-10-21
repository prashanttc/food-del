import { useGetMyOrder } from "@/api/OrderApi"
import OrderList from "@/components/OrderList"


const OrderPage = () => {
    const{orders,isLoading} = useGetMyOrder()
    if(isLoading){
        return "loading...."
    }
    if(!orders || orders.length === 0){
        return <p className="text-red-500 text-center w-screen">no order found</p>
    } 
  return (
    <div className="space-y-10">
   
          <OrderList orders={orders}/>
 
      
    </div>
  )
}

export default OrderPage
