import { Order } from "@/type";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const Apiurl = import.meta.env.VITE_API_BASE_URL;


type checkoutSessionRequest = {
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
export const useCreateCkeckOutSession = () => {
    const { getAccessTokenSilently } = useAuth0();
    const CreateCheckOutSessionRequest = async (checkoutSessionRequest: checkoutSessionRequest) => {
        const accesstoken = await getAccessTokenSilently();
        console.log('Checkout Session Request:', checkoutSessionRequest);
        const response = await fetch(`${Apiurl}api/order/checkout/create-checkout-session`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accesstoken}`,
                "Content-Type": "application/json"

            },
            body: JSON.stringify(checkoutSessionRequest),
        });
        console.log(response)
        if (!response.ok) {
            throw new Error("failed to create session")
        };

        return response.json();
    };

    const { mutateAsync: createCheckoutsession, isLoading, error, reset } = useMutation(CreateCheckOutSessionRequest);

    if (error) {
        toast.error(error.toString())
        reset()
    }

    return { isLoading, createCheckoutsession }
}


export const useGetMyOrder = () => { 
        const { getAccessTokenSilently } = useAuth0();

        const GetMyOrderRequest = async ():Promise<Order[]> => {
            const accesstoken = await getAccessTokenSilently();

            const response = await fetch(`${Apiurl}api/order`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accesstoken}`,
                    "Content-Type": "application/json"
                },
            })
            if (!response.ok) {
                throw new Error("failed to fetch order")
            }
            return response.json()
        }
        const{ 
            data:orders, 
            isLoading ,
             error } = useQuery("fetchOrders", GetMyOrderRequest,{
                refetchInterval:5000
             })
        if (error) {
            toast.error(error.toString())
        }
        return{ 
            orders ,
            isLoading
        }
    }