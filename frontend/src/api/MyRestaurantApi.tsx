import { Order, Restaurant } from "@/type";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
const Apiurl = import.meta.env.VITE_API_BASE_URL;

type UpdateOrderStatus={
    orderId:string;
    status:string;
} 

export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const CreateMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accesstoken = await getAccessTokenSilently();
        const response = await fetch(`${Apiurl}api/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accesstoken}`,
                
            },
            body: restaurantFormData,
        });
        if (!response.ok) {
            throw new Error("failed to create restaurant")
        };
        return response.json();
    };

    const { mutate: createRestaurant, isLoading, error, isSuccess } = useMutation(CreateMyRestaurantRequest);
    if (isSuccess) {
        toast.success("Restaurant created successfully")
    }
    if (error) {
        toast.error("unable to update restaurant")
    }

    return { isLoading, createRestaurant }
}
export const useUpdateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const UpdateMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {

        const accesstoken = await getAccessTokenSilently();

        const response = await fetch(`${Apiurl}api/my/restaurant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accesstoken}`,
                
            },
            body:restaurantFormData
        })
            if (!response.ok) {
            throw new Error("error updating restaurant")
        }
        return response.json();
    }

    const { mutate: updateRestaurant, isLoading, error, isSuccess } = useMutation(UpdateMyRestaurantRequest);
    if (isSuccess) {
        toast.success("Restaurant updated successfully")
    }
    if (error) {
        toast.error("unable to update restaurant")
    }

    return { isLoading, updateRestaurant }
}
export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
    console.log("hwllo")

    const GetMyRestaurantRequest = async (): Promise<Restaurant> => {

        const accesstoken = await getAccessTokenSilently();

        const response = await fetch(`${Apiurl}api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accesstoken}`,
                "Content-Type": "application/json",
            }
        })
        console.log(response);
        if (!response.ok) {
            throw new Error("error fetching restaurant")
        }
        return response.json();
    }

    const{data:restaurant , isLoading} = useQuery("fetchMyRestaurant", GetMyRestaurantRequest)
    return { restaurant,isLoading}
}
export const useGetMyRestaurantOrder = ()=>{
    const {getAccessTokenSilently}= useAuth0();
    const GetMyRestaurantOrderRequest = async():Promise<Order[]>=>{ 
        const accesstoken = await getAccessTokenSilently()
        const response = await fetch(`${Apiurl}api/my/restaurant/order`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${accesstoken}`,
                "Content-Type":"application/json"
            },
        })
        if(!response){
            throw new Error("failed to fetch order")
        }
        return response.json()
    }

    const{data: orders , isLoading ,error} = useQuery("fetchMyOrder", GetMyRestaurantOrderRequest)
    if(error){
        toast.error("unable to fetch orders")
    }
    return {orders,isLoading}
}
export const useUpdateMyOrderStatus = ()=>{
 const{getAccessTokenSilently} = useAuth0()
 const UpdateMyOrderStatusRequest = async(UpdateMyOrderStatus:UpdateOrderStatus)=>{
const accesstoken = await getAccessTokenSilently();
const response = await fetch(`${Apiurl}api/my/restaurant/order/${UpdateMyOrderStatus.orderId}/status`,{
    method:"PATCH",
    headers:{
        Authorization:`Bearer ${accesstoken}`,
        "Content-Type":"application/json"
    },
    body:JSON.stringify({status: UpdateMyOrderStatus.status})
})
if(!response.ok){
  throw new Error("failed to update status")
}
 }

 const{mutateAsync: updateRestaurantStatus, isLoading , isError , isSuccess , reset }= useMutation(UpdateMyOrderStatusRequest)
 if(isSuccess){
    toast.success("Order updated")
 }
 if(isError){
    toast.success(" failed to update order")
reset()
 }
 return{
    updateRestaurantStatus,
    isLoading
 }
}