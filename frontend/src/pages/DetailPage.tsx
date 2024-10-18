import { UseGetMyUser } from "@/api/MyUserApi"
import { useCreateCkeckOutSession } from "@/api/OrderApi"
import { useGetRestaurantById } from "@/api/SearchRestaurantApi"
import CardInfo from "@/components/CardInfo"
import Checkout from "@/components/Checkout"
import MenuItemForCard from "@/components/MenuItemForCard"
import OrderSummary from "@/components/OrderSummary"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { userFormData } from "@/forms/UserProfileForm"
import { MenuItem } from "@/type"
import { useState } from "react"
import { useParams } from "react-router-dom"

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}
const DetailPage = () => {
    const { restaurantId } = useParams()
    const{ currentUser} = UseGetMyUser()
    const { restaurant, isLoading } = useGetRestaurantById(restaurantId)
    const { createCheckoutsession, isLoading: isloadingSession } = useCreateCkeckOutSession()
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItem = sessionStorage.getItem(`cartItem-${restaurantId}`)
        return storedCartItem ? JSON.parse(storedCartItem) : [];
    })
    if (isLoading || !restaurant) {
        return <Progress className="mt-[20%] w-[9%] mx-auto " value={63} />;
    }

    const addToCart = (menuItem: MenuItem) => {
        setCartItems((prevCartItems) => {
            const existingItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id);
            let updatedItem;
            if (existingItem) {
                updatedItem = prevCartItems.map((cartItem) => cartItem._id === menuItem._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
            }
            else {
                updatedItem = [
                    ...prevCartItems, {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1
                    }]
            }

            sessionStorage.setItem(
                `cartItem-${restaurantId}`,
                JSON.stringify(updatedItem)
            )
            return updatedItem;
        })
    }
    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => {
            const updatedItem = prevCartItems.filter((item) => cartItem._id !== item._id);
            sessionStorage.setItem(
                `cartItem-${restaurantId}`,
                JSON.stringify(updatedItem)
            )
            return updatedItem
        })
    }
    const onCheckOut = async (userFormdata: userFormData) => {
        console.log("formdata",userFormdata)
        console.log("email",userFormdata.email)
        if(!restaurant){
            return ;
        }
        const Checkoutdata = {
            cartItems: cartItems.map((cartItem) => ({
                menuItemId: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity.toString()
            })),
            restaurantId: restaurant._id,
            deliveryDetails: {
                name: userFormdata.name,
                addressLine1: userFormdata.addressLine1,
                city: userFormdata.city,
                email: currentUser?.email as string,
            },
        }
        const data = await createCheckoutsession(Checkoutdata)  ;
        window.location.href = data.url;
    }
    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img className="rounded-md object-cover w-full h-full" src={restaurant.imageUrl} /></AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <CardInfo restaurant={restaurant} />
                    <span className="tracking-tighter font-bold tex-2xl">Menu</span>
                    {restaurant.menuItems.map((MenuItem) => (
                        <MenuItemForCard menuItem={MenuItem} addtoCart={() => addToCart(MenuItem)} />
                    ))}
                </div>
                <div>
                    <Card>
                        <OrderSummary restaurant={restaurant} cartItems={cartItems} removefromCart={removeFromCart} />
                        <CardFooter>
                            <Checkout  disabled={cartItems.length===0} onCheckout={onCheckOut} isLoading={isloadingSession}/>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default DetailPage
