import { useAuth0 } from "@auth0/auth0-react"
import { useLocation } from "react-router-dom"
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Dialog } from "./ui/dialog";
import { DialogContent, DialogTrigger } from "../components/ui/dialog";
import UserProfileForm, { userFormData } from "@/forms/UserProfileForm";
import { UseGetMyUser } from "@/api/MyUserApi";

type Props={
    onCheckout:(userFormData:userFormData)=> void;
    disabled:boolean;
    isLoading?: boolean;
}

const Checkout = ({onCheckout,disabled}:Props) => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()
    const{currentUser,isLoading:getmyuserLoading}=UseGetMyUser()
    const { pathname } = useLocation();
    const onlogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname,
            }
        })
    }
    console.log("Current user data:", currentUser);

    if (!isAuthenticated || !currentUser) {
        return <Button onClick={onlogin} className="bg-orange-500 flex-1">login here</Button>
    }
    if (isLoading) {
        return <Button> <Loader2 className="animate-spin w-4 h-4 mr-2" />loading</Button>
    }
   return(
    <Dialog>
        <DialogTrigger asChild>
            <Button disabled={disabled} className="bg-orange-500 flex-1">go to checkout</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[425px] md:max-w-[750px] bg-gray-50">
       <UserProfileForm currentUser={currentUser} isLoading={getmyuserLoading} onSave={onCheckout} title="confirm delivery details" buttontext=" continue to payment"/>
        </DialogContent>
    </Dialog>
   )
}

export default Checkout
