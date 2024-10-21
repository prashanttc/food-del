import { useParams } from "react-router-dom"
import OrderStatusHeader from "./OrderStatusHeader"
import { useGetMySingleOrder } from "@/api/OrderApi"
import { Progress } from "./ui/progress"
import OrderDetail from "./OrderDetail"

const SingleOrderDetail = () => {
    const {orderId} = useParams()

    const{ singleorder ,isLoading}= useGetMySingleOrder(orderId)
    if (isLoading || !singleorder) {
      return <Progress className="mt-[20%] w-[9%] mx-auto " value={63} />;
  }
  return (
    <div className="bg-slate-50 md:m-10 m-2 mt-2 p-10 flex flex-col gap-10">
      <OrderStatusHeader order={singleorder}/>
      <OrderDetail order={singleorder}/>
    
    </div>
  )
}

export default SingleOrderDetail
